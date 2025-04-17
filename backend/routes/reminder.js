const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");

router.get("/", async (req, res) => {
    try {
      const reminders = await Reminder.find()
        .populate("userId", "name email")
        .populate("habitId", "title");
      res.status(200).json(reminders);
    } catch (error) {
      console.error("❌ Error fetching reminders:", error.message);
      res.status(500).json({ error: "Unable to fetch reminders. Please try again later." });
    }
  });

router.get("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id)
      .populate("userId", "name email")
      .populate("habitId", "title");
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId })
      .populate("habitId", "title");
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/habit/:habitId", async (req, res) => {
  try {
    const reminders = await Reminder.find({ habitId: req.params.habitId })
      .populate("userId", "name email");
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { userId, habitId, message, time } = req.body;
    const newReminder = new Reminder({ userId, habitId, message, time });
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (error) {
    console.error("❌ Error creating reminder:", error.message);
    res.status(500).json({ error: "Failed to create reminder" });
  }
});
router.post("/user/:userId", async (req, res) => {
  try {
    const { habitId, message, time } = req.body;
    const { userId } = req.params;

    const reminder = new Reminder({ userId, habitId, message, time });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    console.error("❌ Error creating reminder for user:", error.message);
    res.status(500).json({ error: "Failed to create reminder for user" });
  }
});
module.exports = router;