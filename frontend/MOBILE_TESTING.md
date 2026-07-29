# 📱 V-10 Gym - Mobile Testing Guide

## 🌐 Access URLs

Your Vite dev server is configured with `host: true`, which means it's accessible on your network.

### **Local Access (on your computer):**
```
http://localhost:5173
```

### **Network Access (on mobile/other devices):**
```
http://[YOUR_IP_ADDRESS]:5173
```

## 🔍 How to Find Your Network URL

### **Method 1: Check Terminal Output**
When you run `npm run dev`, Vite shows both URLs:
```
VITE v7.2.4  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

### **Method 2: Find Your IP Address Manually**

**On Windows:**
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your active network adapter
4. Example: `192.168.1.100`
5. Your network URL: `http://192.168.1.100:5173`

**On Mac/Linux:**
1. Open Terminal
2. Type: `ifconfig` or `ip addr`
3. Look for your IP address
4. Your network URL: `http://[YOUR_IP]:5173`

## 📱 Testing on Mobile

### **Prerequisites:**
1. ✅ Your computer and mobile must be on the **same WiFi network**
2. ✅ Firewall should allow port 5173 (Vite handles this usually)
3. ✅ Dev server must be running (`npm run dev`)

### **Steps:**
1. **Start the dev server** (already running)
2. **Find your network IP** (see methods above)
3. **Open mobile browser** (Chrome, Safari, etc.)
4. **Enter the network URL**: `http://[YOUR_IP]:5173`
5. **Test the app!** 🎉

## 🔥 Current Server Status

Based on your terminal, you have:
- ✅ Dev server running on port 5173
- ✅ Network access enabled (`host: true`)
- ✅ Hot Module Replacement (HMR) active

## 🛠️ Troubleshooting

### **Can't access on mobile?**

1. **Check WiFi**: Ensure both devices are on same network
2. **Check Firewall**: 
   - Windows: Allow port 5173 in Windows Defender
   - Mac: System Preferences → Security → Firewall → Allow Vite
3. **Restart Server**: Stop and restart `npm run dev`
4. **Try Different Browser**: Sometimes Safari/Chrome behave differently

### **Windows Firewall Rule (if needed):**
```powershell
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=5173
```

## 📊 What to Test on Mobile

### **Core Features:**
- ✅ Home page with logo (now larger!)
- ✅ Navigation (Home, Calendar, Workouts, Profile)
- ✅ Dark mode toggle (Settings)
- ✅ Progress cards
- ✅ Workout cards
- ✅ Diet plan section
- ✅ Water tracker
- ✅ Profile stats
- ✅ Settings pages (FAQ, Terms, About, Privacy, Achievements)

### **Responsive Design:**
- ✅ Touch interactions
- ✅ Scrolling smoothness
- ✅ Button sizes (touch-friendly)
- ✅ Text readability
- ✅ Image loading
- ✅ Animations/transitions

## 🎯 Quick Access Commands

### **Get Your IP (Windows):**
```powershell
ipconfig | findstr IPv4
```

### **Get Your IP (Mac/Linux):**
```bash
ifconfig | grep "inet "
```

### **Restart Dev Server:**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## 📝 Example Network URLs

If your IP is `192.168.1.100`:
- 🏠 Home: `http://192.168.1.100:5173/`
- 📅 Calendar: `http://192.168.1.100:5173/calendar`
- 💪 Workouts: `http://192.168.1.100:5173/workouts`
- 👤 Profile: `http://192.168.1.100:5173/profile`
- ⚙️ Settings: `http://192.168.1.100:5173/settings`
- ❓ FAQ: `http://192.168.1.100:5173/faq`
- 🏆 Achievements: `http://192.168.1.100:5173/achievements`

## 🌟 Pro Tips

1. **Bookmark on Mobile**: Add to home screen for app-like experience
2. **Use Chrome DevTools**: Connect mobile Chrome to desktop for debugging
3. **Test Dark Mode**: Toggle in Settings to test both themes
4. **Test Gestures**: Swipe, tap, long-press interactions
5. **Check Performance**: Smooth scrolling and transitions

## 🔒 Security Note

The network URL is only accessible on your local network. It's safe for testing but not exposed to the internet.

---

**Happy Testing!** 📱✨

If you need help finding your IP or accessing on mobile, let me know!
