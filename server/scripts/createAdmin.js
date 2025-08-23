// createAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin'); // Adjust the path if needed
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admin = new Admin({
      username: "admin",
      email: "admin@example.com",
      password: "123",  // 👈 plain password — schema will hash it
      role: "admin",
    });
    await admin.save();
    console.log("✅ Admin created with hashed password.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
}

createAdmin();


