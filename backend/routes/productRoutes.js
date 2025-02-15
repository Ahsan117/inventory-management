const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// 🟢 Add a Product
router.post("/", async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    const product = new Product({ name, price, category, stock, soldOut: false });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// 🔵 Fetch All Products (with Search & Filter)
router.get("/", async (req, res) => {
  try {
    const { search, category, minStock } = req.query;
    let filter = {};

    // Search by product name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Stock alert: Filter products with low stock
    if (minStock) {
      filter.stock = { $lte: Number(minStock) };
    }

    const products = await Product.find(filter);
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

// 🟡 Toggle Sold-Out Status (Fix)
router.put("/:id/soldout", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.soldOut = !product.soldOut; // Toggle sold-out status
    await product.save();
    res.json({ message: "Sold-out status updated", product });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

module.exports = router;
