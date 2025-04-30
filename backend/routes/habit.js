const express = require("express");
const router = express.Router();
const Habit = require("../models/Habit");
const Streak = require("../models/Streak");
const auth = require("../middleware/auth");
const axios = require("axios");

// Get all habits
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get specific habit
router.get("/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new habit
router.post("/", auth, async (req, res) => {
  try {
    const { name, frequency = "daily" } = req.body;
    
    const newHabit = new Habit({
      name,
      frequency,
      userId: req.user._id,
      progress: []
    });
    
    await newHabit.save();

    // Initialize streak for the habit
    const streak = new Streak({
      userId: req.user._id,
      habitId: newHabit._id,
      currentStreak: 0,
      longestStreak: 0,
      milestones: { weekly: false, monthly: false }
    });
    
    await streak.save();
    
    res.status(201).json(newHabit);
  } catch (error) {
    console.error("❌ Error creating habit:", error.message);
    res.status(500).json({ error: "Failed to create habit" });
  }
});

// Update habit completion status
router.post("/:id/complete", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if habit is already completed for today
    const existingProgress = habit.progress.find(p => 
      new Date(p.date).toDateString() === today.toDateString()
    );

    if (existingProgress) {
      existingProgress.completed = true;
    } else {
      habit.progress.push({
        date: today,
        completed: true
      });
    }

    await habit.save();

    // Update streak directly
    const streak = await Streak.findOne({
      habitId: habit._id,
      userId: req.user._id
    });

    if (streak) {
      const completionDates = habit.progress
        .filter(p => p.completed)
        .map(p => p.date);

      // Calculate current streak
      let currentStreak = 1;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const lastCompletedDate = new Date(completionDates[completionDates.length - 1]);
      
      if (lastCompletedDate.toDateString() === today.toDateString() ||
          lastCompletedDate.toDateString() === yesterday.toDateString()) {
        
        for (let i = completionDates.length - 1; i > 0; i--) {
          if (Math.abs(new Date(completionDates[i]) - new Date(completionDates[i - 1])) === 86400000) {
            currentStreak++;
          } else {
            break;
          }
        }
      } else {
        currentStreak = 0;
      }

      // Update streak
      streak.currentStreak = currentStreak;
      streak.longestStreak = Math.max(streak.longestStreak, currentStreak);
      streak.lastCompletedDate = today;
      streak.milestones = {
        weekly: currentStreak >= 7,
        monthly: currentStreak >= 30
      };

      await streak.save();
    }

    res.status(200).json(habit);
  } catch (error) {
    console.error("❌ Error completing habit:", error.message);
    res.status(500).json({ error: "Failed to complete habit" });
  }
});

// Update habit details
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, frequency } = req.body;
    
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Name must be a non-empty string" });
    }
    
    if (frequency && !["daily", "weekly"].includes(frequency)) {
      return res.status(400).json({ error: "Frequency must be 'daily' or 'weekly'" });
    }

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, frequency },
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

// Delete habit
router.delete("/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Delete associated streak
    await Streak.findOneAndDelete({
      habitId: req.params.id,
      userId: req.user._id
    });

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting habit:", error.message);
    res.status(500).json({ error: "Failed to delete habit" });
  }
});

module.exports = router;