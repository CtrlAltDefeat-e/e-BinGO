const express = require("express");
const router = express.Router();
const { db } = require("../firebaseAdmin");
const verifyToken = require("../middleware/authMiddleware");

// Get user data (Protected)
router.get("/user", verifyToken, async (req, res) => {
  try {
    const userDoc = await db.collection("users").doc(req.user.uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
