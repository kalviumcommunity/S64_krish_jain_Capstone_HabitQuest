const express = require('express');
const router = express.Router();
const Streak = require('../models/Streak');
const Habit = require('../models/Habit');
const { isAuthenticated } = require('../middleware/auth');

// Helper function to check if two dates are consecutive
const isConsecutiveDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

// Get streak information for a habit
router.get('/:habitId', isAuthenticated, async (req, res) => {
  try {
    const streak = await Streak.findOne({
      userId: req.user._id,
      habitId: req.params.habitId
    });

    if (!streak) {
      return res.status(404).json({ message: 'Streak not found' });
    }

    res.json(streak);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streak information', error: error.message });
  }
});

// Update streak for a habit
router.post('/:habitId/update', isAuthenticated, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.habitId,
      userId: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Get completion dates in ascending order
    const completionDates = habit.progress
      .filter(p => p.completed)
      .map(p => p.date)
      .sort((a, b) => a - b);

    if (completionDates.length === 0) {
      return res.json({
        currentStreak: 0,
        longestStreak: 0,
        milestones: { weekly: false, monthly: false }
      });
    }

    // Calculate current streak
    let currentStreak = 1;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastCompletedDate = new Date(completionDates[completionDates.length - 1]);
    
    // Check if the last completion was today or yesterday
    if (lastCompletedDate.toDateString() === today.toDateString() ||
        lastCompletedDate.toDateString() === yesterday.toDateString()) {
      
      // Count backwards from the last completion
      for (let i = completionDates.length - 1; i > 0; i--) {
        if (isConsecutiveDay(completionDates[i], completionDates[i - 1])) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      currentStreak = 0;
    }

    // Calculate longest streak
    let longestStreak = 1;
    let tempStreak = 1;
    
    for (let i = 1; i < completionDates.length; i++) {
      if (isConsecutiveDay(completionDates[i - 1], completionDates[i])) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Update or create streak document
    const streak = await Streak.findOneAndUpdate(
      { userId: req.user._id, habitId: req.params.habitId },
      {
        currentStreak,
        longestStreak,
        lastCompletedDate,
        milestones: {
          weekly: currentStreak >= 7,
          monthly: currentStreak >= 30
        },
        $push: {
          streakHistory: {
            date: new Date(),
            completed: true,
            streakCount: currentStreak
          }
        }
      },
      { upsert: true, new: true }
    );

    res.json(streak);
  } catch (error) {
    res.status(500).json({ message: 'Error updating streak', error: error.message });
  }
});

// Get all streaks for user
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const streaks = await Streak.find({ userId: req.user._id })
      .populate('habitId', 'name');
    
    res.json(streaks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching streaks', error: error.message });
  }
});

module.exports = router; 