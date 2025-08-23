const Feedback = require('../models/Feedback');
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

// const submitFeedback = async (req, res) => {
//   try {
//     const { name,email, message } = req.body;
//     const feedback = new Feedback({ name,email, message });
//     await feedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully!' });
//   } catch (err) {
//     console.error("Feedback submission error:", err); 
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// };

const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    res.status(200).json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch feedback' });
  }
};

module.exports = { submitFeedback, getAllFeedback };

