const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, habitId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Habit", 
    required: true 
  }, currentStreak: { 
    type: Number, 
    default: 0 
  }, longestStreak: { 
    type: Number, 
    default: 0 
  }, lastCompleted: { 
    type: Date 
  },
  streakHistory: [
    {
      date: { type: Date }, success: { type: Boolean }
    }
  ]
}, {
  timestamps: true,
});
module.exports = mongoose.model("Streak", streakSchema);
