const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");

router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find().populate("userId", "name email");
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id).populate("userId", "name email");
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const userHabits = await Habit.find({ userId: req.params.userId });
    res.status(200).json(userHabits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;