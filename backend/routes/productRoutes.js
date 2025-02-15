const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// 🟢 Add a Product
router.post("/", async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const product = new Product({ name, price, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// 🔵 Fetch All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// 🔴 Delete a Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

// 🟡 Mark Product as Sold Out
router.put("/:id/soldout", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.soldOut = true;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

module.exports = router;
