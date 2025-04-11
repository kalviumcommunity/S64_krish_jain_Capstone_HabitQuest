const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", required: true, unique: true, 
  },
  totalStreaks: {
    type: Number, default: 0,
  },
  highestSingleStreak: {
    type: Number, default: 0,
  },
  habitsTracked: {
    type: Number, default: 0,
  },
  lastUpdated: {
    type: Date,default: Date.now,
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model("Leaderboard", leaderboardSchema);
