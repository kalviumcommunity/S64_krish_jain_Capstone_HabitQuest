const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected 🎉 🎊");
})
.catch((err) => console.error("❌ DB connection failed:", err));

const habitRoutes = require("./routes/habit");
const userRoutes = require("./routes/user");
const leaderboardRoutes = require("./routes/leaderboard");
const reminderRoutes = require("./routes/reminder");
const streakRoutes = require("./routes/streaks");
const friendRoutes = require("./routes/friend");

app.use("/api/habits", habitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/friends", friendRoutes);

app.get("/", (req, res) => {
  res.send("🏹 Welcome to HabitQuest API");
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});