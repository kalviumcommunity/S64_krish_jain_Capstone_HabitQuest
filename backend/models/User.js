const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  streaks: { type: Number, default: 0 },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
