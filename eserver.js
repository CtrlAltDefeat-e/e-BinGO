const express = require("express");
const { verifyToken } = require("./src/auth"); // Adjust the path based on where auth.js is located
const app = express();

app.use(express.json());

// Example protected route
app.post("/add-product", verifyToken, (req, res) => {
  res.send("Product added successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
