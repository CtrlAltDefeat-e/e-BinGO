const db = require("./firebase");

db.collection("users").doc("user1").onSnapshot((doc) => {
  console.log("Updated Data:", doc.data());
});
