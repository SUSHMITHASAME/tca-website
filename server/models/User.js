// server/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Only allows these two values
      default: 'user', // Everyone is a 'user' by default
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);