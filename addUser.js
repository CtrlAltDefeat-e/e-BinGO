const db = require("./firebase");

async function addUser() {
  const docRef = db.collection("users").doc("user1");

  await docRef.set({
    name: "John Doe",
    email: "john@example.com",
    age: 25,
  });

  console.log("User added successfully!");
}

addUser().catch(console.error);
