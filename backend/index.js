const express = require("express");
const admin = require("./config/firebaseConfig");

const app = express();
const PORT = 5000;

app.get("/test-firebase", async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers(1); // List 1 user as a test
    res.status(200).send({ message: "Firebase Admin is working!", listUsers });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
