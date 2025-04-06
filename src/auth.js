const admin = require("firebase-admin");

// Initialize Firebase only if it hasn't been initialized yet
if (!admin.apps.length) {
  const serviceAccount = require("../serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ewaste-management-f1680-default-rtdb.firebaseio.com",
  });
}

const auth = admin.auth();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1]; // Ensure "Bearer " is stripped correctly

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = { auth, verifyToken };
