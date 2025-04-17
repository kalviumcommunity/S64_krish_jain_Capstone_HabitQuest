const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());


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

app.use("/api/habits", habitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/reminders", reminderRoutes);

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