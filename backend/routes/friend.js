const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Get user's friends
router.get("/:userId/friends", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.friends);
  } catch (error) {
    console.error("❌ Error fetching friends:", error.message);
    res.status(500).json({ error: "Failed to fetch friends" });
  }
});

// Get friend requests
router.get("/:userId/requests", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friendRequests");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.friendRequests);
  } catch (error) {
    console.error("❌ Error fetching friend requests:", error.message);
    res.status(500).json({ error: "Failed to fetch friend requests" });
  }
});

// Search for users
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).select("name email profilePicture");

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error searching users:", error.message);
    res.status(500).json({ error: "Failed to search users" });
  }
});

// Send friend request
router.post("/:userId/requests/:friendId", async (req, res) => {
  try {
    const [user, friend] = await Promise.all([
      User.findById(req.params.userId),
      User.findById(req.params.friendId)
    ]);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    if (friend.friendRequests.includes(user._id)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    friend.friendRequests.push(user._id);
    await friend.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error("❌ Error sending friend request:", error.message);
    res.status(500).json({ error: "Failed to send friend request" });
  }
});

// Accept friend request
router.post("/:userId/accept/:friendId", async (req, res) => {
  try {
    const [user, friend] = await Promise.all([
      User.findById(req.params.userId),
      User.findById(req.params.friendId)
    ]);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequests.includes(friend._id)) {
      return res.status(400).json({ message: "No friend request found" });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friend._id.toString());
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await Promise.all([user.save(), friend.save()]);

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("❌ Error accepting friend request:", error.message);
    res.status(500).json({ error: "Failed to accept friend request" });
  }
});

// Decline friend request
router.post("/:userId/decline/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== req.params.friendId);
    await user.save();

    res.status(200).json({ message: "Friend request declined successfully" });
  } catch (error) {
    console.error("❌ Error declining friend request:", error.message);
    res.status(500).json({ error: "Failed to decline friend request" });
  }
});

// Remove friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const [user, friend] = await Promise.all([
      User.findById(req.params.userId),
      User.findById(req.params.friendId)
    ]);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends = user.friends.filter(id => id.toString() !== friend._id.toString());
    friend.friends = friend.friends.filter(id => id.toString() !== user._id.toString());

    await Promise.all([user.save(), friend.save()]);

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("❌ Error removing friend:", error.message);
    res.status(500).json({ error: "Failed to remove friend" });
  }
});

module.exports = router; 