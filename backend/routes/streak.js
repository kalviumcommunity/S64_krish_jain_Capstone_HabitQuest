const express = require("express");
const router = express.Router();
const Streak = require("../models/Streak");

router.get("/", async (req, res) => {
  try {
    const streaks = await Streak.find()
      .populate("userId", "name email")
      .populate("habitId", "title");
    res.status(200).json(streaks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const streak = await Streak.findById(req.params.id)
      .populate("userId", "name email")
      .populate("habitId", "title");
    if (!streak) return res.status(404).json({ message: "Streak not found" });
    res.status(200).json(streak);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const streaks = await Streak.find({ userId: req.params.userId })
      .populate("habitId", "title");
    res.status(200).json(streaks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/user/:userId/habit/:habitId", async (req, res) => {
  try {
    const streak = await Streak.findOne({
      userId: req.params.userId,
      habitId: req.params.habitId,
    });
    if (!streak) return res.status(404).json({ message: "Streak not found" });
    res.status(200).json(streak);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;