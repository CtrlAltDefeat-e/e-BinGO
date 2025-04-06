const { db } = require("../firebase"); // ✅ Import Firestore properly

exports.getAllProducts = async (req, res) => {
  try {
    const productsSnapshot = await db.collection("products").get();
    const products = productsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
