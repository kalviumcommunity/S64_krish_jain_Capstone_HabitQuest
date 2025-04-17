const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate("userId", "name email") 
      .sort({ totalStreaks: -1 }); 
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId })
      .populate("userId", "name email");
    if (!entry) {
      return res.status(404).json({ message: "User not found in leaderboard." });
    }
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/top/:n", async (req, res) => {
    const n = req.params.n;
    const limit = parseInt(n);
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: "Invalid number. Please provide a positive integer." });
    }

    try {
      const topUsers = await Leaderboard.find()
        .populate("userId", "name email")
        .sort({ totalStreaks: -1 })
        .limit(limit);
      res.status(200).json(topUsers);
    } catch (err) {
      console.error("❌ Error fetching top users:", err.message);
      res.status(500).json({ error: "Something went wrong while fetching leaderboard data." });
    }
  });
  router.put("/:userId", async (req, res) => {
    try {
      const { totalStreaks } = req.body;
      const updatedEntry = await Leaderboard.findOneAndUpdate(
        { userId: req.params.userId },
        { totalStreaks },
        { new: true }
      );
      if (!updatedEntry) {
        return res.status(404).json({ message: "Leaderboard entry not found" });
      }
      res.status(200).json(updatedEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;