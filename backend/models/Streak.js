const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  habitId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Habit", 
    required: true 
  },
  currentStreak: { 
    type: Number, 
    default: 0 
  },
  longestStreak: { 
    type: Number, 
    default: 0 
  },
  lastCompletedDate: { 
    type: Date 
  },
  milestones: {
    weekly: { type: Boolean, default: false },
    monthly: { type: Boolean, default: false }
  },
  streakHistory: [{
    date: { type: Date },
    completed: { type: Boolean },
    streakCount: { type: Number }
  }]
}, {
  timestamps: true
});

// Add index for efficient querying
streakSchema.index({ userId: 1, habitId: 1 }, { unique: true });

module.exports = mongoose.model("Streak", streakSchema);
