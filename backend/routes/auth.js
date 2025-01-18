const express = require("express");
const admin = require("../config/firebaseConfig");
const router = express.Router();

router.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ user: decodedToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
