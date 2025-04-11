const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  type: { type: String, enum: ["email", "push"], default: "email" },
  time: { type: String }, 
  repeat: { type: String, enum: ["daily", "weekly"], default: "daily" },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Reminder", reminderSchema);
