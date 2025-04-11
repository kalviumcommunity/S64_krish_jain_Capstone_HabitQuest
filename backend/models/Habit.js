const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
  progress: [
    {
      date: { type: Date },
      completed: { type: Boolean, default: false }
    }
  ],
  streakCount: { type: Number, default: 0 }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Habit", habitSchema);
