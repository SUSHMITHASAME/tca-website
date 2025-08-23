process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
// API routes
app.use("/api/feedback", feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teams',teamRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

