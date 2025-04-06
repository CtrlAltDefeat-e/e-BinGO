const db = require("./firebase");

async function getUser() {
  const docRef = db.collection("users").doc("user1");
  const doc = await docRef.get();

  if (doc.exists) {
    console.log("User Data:", doc.data());
  } else {
    console.log("No such document!");
  }
}

getUser().catch(console.error);

