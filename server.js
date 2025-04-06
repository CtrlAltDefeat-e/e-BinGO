const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // Ensure correct import path

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Add a default route to check if API is working
app.get("/", (req, res) => {
  res.send("🚀 E-Waste API is running!");
});

// ✅ Serve Favicon to prevent console errors
app.get("/favicon.ico", (req, res) => res.status(204));

// ✅ Ensure correct route mapping
app.use("/api/products", productRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
