require('dotenv').config();
const mongoose = require('mongoose');
const xlsx = require('xlsx');
const path = require('path');
const Enquiry = require('./models/Enquiry');
const Employee = require('./models/Employee');
const Admin = require('./models/Admin');

const MONGO_URI = process.env.MONGO_URI;

function parseDate(dateStr) {
    if (!dateStr) return new Date();
    if (dateStr instanceof Date) return dateStr;
    const date = new Date(dateStr);
    return isNaN(date) ? new Date() : date;
}

function normalizeGender(g) {
    if (!g) return 'Male';
    const gender = String(g).trim().toLowerCase();
    if (gender.startsWith('m')) return 'Male';
    if (gender.startsWith('f')) return 'Female';
    return 'Other';
}

const uploadEnquiries = async () => {
    try {
        console.log("🚀 Enquiry Migration Started...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to DB");

        await Enquiry.deleteMany({});
        console.log("🧹 Old Enquiry Data Cleared");

        const filePath = path.join(__dirname, 'enquiries (2).xlsx');
        const workbook = xlsx.readFile(filePath);
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        console.log(`📄 Total Rows in Excel: ${rows.length}`);

        const employees = await Employee.find({});
        console.log(`👨‍💼 Total Employees found: ${employees.length}`);

        const enquiryObjects = [];
        const usedIds = new Set();
        let matchedEmployees = 0;
        let missedEmployees = 0;

        for (const row of rows) {
            const enquiryId = String(row["ID"] || "").trim();
            const mobile = String(row["Mobile Number"] || "").trim();
            const fullName = String(row["Name"] || "Unknown User").trim();
            const handleByName = String(row["Handel By"] || row["Handel by"] || "").trim();
            const createdBy = String(row["Created by"] || "Admin").trim();
            const dateOfEnquiry = parseDate(row["Date of Enquiry"]);

            if (!mobile || !fullName) continue;
            if (enquiryId && usedIds.has(enquiryId)) continue;
            if (enquiryId) usedIds.add(enquiryId);

            const nameParts = fullName.split(" ");
            const firstName = nameParts[0] || "Unknown";
            const lastName = nameParts.slice(1).join(" ") || "User";

            let handleBy = null;
            if (handleByName) {
                const emp = employees.find(e =>
                    (`${e.firstName} ${e.lastName}`).toLowerCase().includes(handleByName.toLowerCase()) ||
                    handleByName.toLowerCase().includes(e.firstName.toLowerCase())
                );

                if (emp) {
                    handleBy = emp._id;
                    matchedEmployees++;
                } else {
                    missedEmployees++;
                }
            }

            enquiryObjects.push({
                enquiryId,
                firstName,
                lastName,
                mobile,
                gender: normalizeGender(row["Gender"]),
                handleBy,
                createdBy,
                createdAt: dateOfEnquiry,
                status: 'Open'
            });
        }

        console.log(`📦 Inserting ${enquiryObjects.length} records...`);
        const result = await Enquiry.insertMany(enquiryObjects, { ordered: false });

        console.log("\n=================================");
        console.log("✅ Enquiry Migration Completed");
        console.log(`✔ Inserted: ${result.length}`);
        console.log(`👤 HandleBy Matched: ${matchedEmployees}`);
        console.log(`👤 HandleBy Missed: ${missedEmployees}`);
        console.log("=================================");
        process.exit(0);
    } catch (err) {
        if (err.writeErrors) {
            console.log(`⚠ Partial Success: ${err.insertedDocs.length} inserted. ${err.writeErrors.length} errors.`);
        } else {
            console.error("❌ Migration Failed:", err.message);
        }
        process.exit(1);
    }
};

uploadEnquiries();
