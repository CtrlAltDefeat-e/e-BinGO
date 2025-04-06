const { db } = require("./firebase");

async function checkProducts() {
  const productsSnapshot = await db.collection("products").get();
  if (productsSnapshot.empty) {
    console.log("❌ No products found in Firestore!");
  } else {
    productsSnapshot.forEach(doc => {
      console.log("✅ Found product:", doc.id, doc.data());
    });
  }
}

checkProducts();
