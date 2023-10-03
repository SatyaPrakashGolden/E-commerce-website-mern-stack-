const Product = require("../models/Product");
const express = require("express");
// const verifyToken = require("../middlewares/auth");

const productController = express.Router();

productController.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products || products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

productController.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

productController.post("/",  async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = productController;
