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
router.post("/", async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const newHabit = new Habit({ title, description, userId });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("❌ Error creating habit:", error.message);
    res.status(500).json({ error: "Failed to create habit" });
  }
});
router.post("/user/:userId", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { userId } = req.params;

    const newHabit = new Habit({ title, description, userId });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("❌ Error creating habit for user:", error.message);
    res.status(500).json({ error: "Failed to create habit for user" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { title, frequency } = req.body;
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a non-empty string" });
    }
    if (!frequency || !["daily", "weekly", "monthly"].includes(frequency)) {
      return res.status(400).json({ error: "Frequency must be 'daily', 'weekly', or 'monthly'" });
    }
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { title, frequency },
      { new: true }
    );
    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error("❌ Error updating habit:", error.message);
    res.status(500).json({ error: "Failed to update habit" });
  }
});

module.exports = router;