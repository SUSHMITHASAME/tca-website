const express = require("express");
const router = express.Router();
const { submitFeedback, getAllFeedback } = require("../controllers/feedbackController");
const {verifyToken} = require("../middleware/auth");

// Public route to submit feedback
router.post("/submit", submitFeedback);

// Protected route — only admins can see all feedback
router.get("/all", verifyToken, getAllFeedback);

// Test route to check token verification
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You have access!', admin: req.admin });
});

module.exports = router;
