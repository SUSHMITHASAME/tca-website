const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: { type: String, enum: ['about', 'history', 'vision'] },
  content: String,
});

module.exports = mongoose.model('Content', contentSchema);
