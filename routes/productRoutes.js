const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // ✅ Import controller
const { getAllProducts } = require("../controllers/productController");


router.get("/", getAllProducts);  // ✅ Now it correctly matches /api/products
 // ✅ Correct GET route

module.exports = router;







