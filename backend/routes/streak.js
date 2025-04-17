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
router.post("/", async (req, res) => {
  try {
    const { userId, habitId, currentStreak, lastChecked } = req.body;
    const newStreak = new Streak({ userId, habitId, currentStreak, lastChecked });
    await newStreak.save();
    res.status(201).json(newStreak);
  } catch (error) {
    console.error("❌ Error creating streak:", error.message);
    res.status(500).json({ error: "Failed to create streak" });
  }
});
router.post("/user/:userId/habit/:habitId", async (req, res) => {
  try {
    const { currentStreak, lastChecked } = req.body;
    const { userId, habitId } = req.params;

    const newStreak = new Streak({ userId, habitId, currentStreak, lastChecked });
    await newStreak.save();
    res.status(201).json(newStreak);
  } catch (error) {
    console.error("❌ Error creating streak:", error.message);
    res.status(500).json({ error: "Failed to create streak" });
  }
});
router.put("/:userId", async (req, res) => {
  try {
    const { streaks } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { streaks },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;