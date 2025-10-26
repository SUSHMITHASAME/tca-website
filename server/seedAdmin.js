const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Adjust path if needed
require('dotenv').config();

// --- DEFINE YOUR ADMIN ---
const ADMIN_EMAIL = 'admin@yourwebsite.com';
const ADMIN_PASSWORD = '123';
const ADMIN_USERNAME = 'admin'; // You added this in your model
// -------------------------

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      mongoose.connection.close();
      return;
    }

    // We pass the PLAIN password
    // The Admin.js model's 'pre-save' hook will hash it for us
    const newAdmin = new Admin({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, // Pass the plain text
      role: 'admin',
    });

    await newAdmin.save(); // The model's hook will run here
    console.log('Admin user created successfully!');
  } catch (err) {
    console.error('Error seeding admin:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDB();