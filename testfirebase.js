const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function generateCustomToken(uid) {
  try {
    const token = await admin.auth().createCustomToken(uid);
    console.log(`Custom Token for UID ${uid}:`, token);
  } catch (error) {
    console.error("Error generating token:", error.message);
  }
}

// Replace 'user-uid-here' with a real user UID from Firebase Auth
generateCustomToken("user-uid-here");
