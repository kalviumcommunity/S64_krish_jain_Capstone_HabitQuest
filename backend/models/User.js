const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "https://placehold.co/100x100/7c3aed/FFFFFF?text=U" },
  streaks: { type: Number, default: 0 },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
