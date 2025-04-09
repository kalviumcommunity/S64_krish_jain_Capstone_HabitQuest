const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  frequency: { type: String }, // e.g., 'daily', 'weekly'
  progress: [{ date: Date, completed: Boolean }],
  streakCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Habit", habitSchema);
