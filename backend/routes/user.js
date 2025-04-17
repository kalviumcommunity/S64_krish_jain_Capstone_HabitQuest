const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("habits");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("habits");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); 
  } catch (err) {
    console.error("❌ Error fetching user:", err.message);
    res.status(500).json({ error: "Failed to fetch user. Please try again later." });
  }
});
module.exports = router;