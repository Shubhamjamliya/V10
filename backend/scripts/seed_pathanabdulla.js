const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedPathanAbdulla = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected...');

        const oldEmail = 'pathanabdulla@gmail.com';
        const newName = 'Abdulla Pathan';
        const newEmail = 'pathanbadulla19997@gmail.com';
        const newPassword = 'abdulla123';

        // 1. Delete old admin if exists
        await Admin.deleteMany({ email: { $in: [oldEmail, newEmail] } });
        console.log(`🧹 Cleaned up existing admin records for ${oldEmail} and ${newEmail}`);

        // 2. Create new admin
        const admin = await Admin.create({
            name: newName,
            email: newEmail,
            password: newPassword,
            role: 'admin'
        });

        if (admin) {
            console.log('🚀 Admin "Abdulla Pathan" created successfully!');
            console.log('------------------------------');
            console.log(`Email:    ${newEmail}`);
            console.log(`Password: ${newPassword}`);
            console.log('------------------------------');
        } else {
            console.log('❌ Failed to create admin: Invalid data');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedPathanAbdulla();
