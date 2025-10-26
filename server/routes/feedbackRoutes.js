const express = require("express");
const router = express.Router();

const { 
  submitFeedback, 
  getAllFeedback, 
  deleteFeedback,
  adminCreateFeedback, // Import new
  updateFeedback       // Import new
} = require("../controllers/feedbackController");

const { verifyToken } = require("../middleware/auth"); 

// Public route to submit feedback
router.post("/submit", submitFeedback);

// --- Admin Routes ---

// GET all feedback (matches React code)
router.get("/", verifyToken, getAllFeedback);

// POST new feedback (for admin create)
router.post("/", verifyToken, adminCreateFeedback); 

// PUT (update) a specific feedback
router.put("/:id", verifyToken, updateFeedback); 

// DELETE a specific feedback (matches React code)
router.delete("/:id", verifyToken, deleteFeedback);

module.exports = router;
