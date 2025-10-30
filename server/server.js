// In your server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
const cors = require("cors"); // You already have this
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes');
dotenv.config();
connectDB();

const app = express();

// --- THIS IS THE FIX ---
// Replace your simple app.use(cors());
// with this more specific version.
app.use(cors({
  origin: process.env.FRONTEND_URL, // Reads the new variable
  credentials: true
}));
// -----------------------

app.use(express.json());

// API routes
app.use("/api/feedback", feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/youtube', youtubeRoutes);
app.get('/healthz', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

