const Feedback = require('../models/Feedback');

// PUBLIC: Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    console.log("Feedback saved:", feedback);
    res.status(201).json({ success: true, message: 'Feedback submitted successfully!' });
  } catch (err) {
    console.error("Feedback submission error:", err);
    res.status(500).json({ success: false, error: 'Server error while submitting feedback' });
  }
};

// ADMIN: Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    res.status(200).json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch feedback' });
  }
};

// ADMIN: Delete feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    await feedback.deleteOne(); // Correct method
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    console.error("Delete feedback error:", err);
    res.status(500).json({ error: 'Unable to delete feedback' });
  }
};

// ADMIN: Create new feedback
const adminCreateFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ success: true, feedback: feedback });
  } catch (err) {
    console.error("Admin create feedback error:", err);
    res.status(500).json({ success: false, error: 'Server error while creating feedback' });
  }
};

// ADMIN: Update feedback
const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    // Update fields
    feedback.name = req.body.name || feedback.name;
    feedback.email = req.body.email || feedback.email;
    feedback.message = req.body.message || feedback.message;

    const updatedFeedback = await feedback.save();
    
    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (err) {
    console.error("Update feedback error:", err);
    res.status(500).json({ error: 'Unable to update feedback' });
  }
};

// This was misspelled as 'momodule' and was missing the closing '}'
module.exports = {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
  adminCreateFeedback,
  updateFeedback
};