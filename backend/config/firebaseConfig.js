const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json"); // Update with the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
