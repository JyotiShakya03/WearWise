
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    res.status(200).json(products);
  } catch (error) {
    console.error("Product Fetch Error:", error);
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
});

// Admin: Add New Product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { name, price, rating, category, image } = req.body;

      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof category !== "string" ||
        !category.trim() ||
        typeof image !== "string" ||
        !image.trim() ||
        price === undefined ||
        price === null ||
        price === ""
      ) {
        return res.status(400).json({
          message: "Valid name, price, category and image are required"
        });
      }

      if (
        (typeof price !== "number" && typeof price !== "string") ||
        (typeof price === "string" && !price.trim()) ||
        !Number.isFinite(Number(price)) ||
        Number(price) <= 0
      ) {
        return res.status(400).json({
          message: "Please enter a valid product price"
        });
      }

      if (
        rating !== undefined &&
        (
          (typeof rating !== "number" && typeof rating !== "string") ||
          (typeof rating === "string" && !rating.trim()) ||
          !Number.isFinite(Number(rating)) ||
          Number(rating) < 0 ||
          Number(rating) > 5
        )
      ) {
        return res.status(400).json({
          message: "Rating must be between 0 and 5."
        });
      }

      const lastProduct = await Product.findOne().sort({ id: -1 });
      const newId = lastProduct ? lastProduct.id + 1 : 1;

      const newProduct = await Product.create({
        id: newId,
        name: name.trim(),
        price: Number(price),
        rating: rating !== undefined ? Number(rating) : 0,
        category: category.trim(),
        image: image.trim()
      });

      return res.status(201).json({
        message: "Product added successfully",
        product: newProduct
      });

    } catch (error) {
      console.error("Add Product Error:", error);

      if (error.code === 11000) {
        return res.status(409).json({
          message: "Product ID already exists. Please try again."
        });
      }

      return res.status(500).json({
        message: "Failed to add product"
      });
    }
  }
);

// Admin: Update Existing Product
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const productId = Number(req.params.id);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          message: "Invalid product ID"
        });
      }

      const { name, price, rating, category, image } = req.body;
      const updateData = {};

      if (name !== undefined) {
        if (typeof name !== "string" || !name.trim()) {
          return res.status(400).json({
            message: "Product name cannot be empty."
          });
        }

        updateData.name = name.trim();
      }

      if (price !== undefined) {
        if (
          (typeof price !== "number" && typeof price !== "string") ||
          (typeof price === "string" && !price.trim()) ||
          !Number.isFinite(Number(price)) ||
          Number(price) <= 0
        ) {
          return res.status(400).json({
            message: "Please enter a valid product price"
          });
        }

        updateData.price = Number(price);
      }

      if (rating !== undefined) {
        if (
          (typeof rating !== "number" && typeof rating !== "string") ||
          (typeof rating === "string" && !rating.trim()) ||
          !Number.isFinite(Number(rating)) ||
          Number(rating) < 0 ||
          Number(rating) > 5
        ) {
          return res.status(400).json({
            message: "Rating must be between 0 and 5."
          });
        }

        updateData.rating = Number(rating);
      }

      if (category !== undefined) {
        if (typeof category !== "string" || !category.trim()) {
          return res.status(400).json({
            message: "Product category cannot be empty."
          });
        }

        updateData.category = category.trim();
      }

      if (image !== undefined) {
        if (typeof image !== "string" || !image.trim()) {
          return res.status(400).json({
            message: "Product image is required."
          });
        }

        updateData.image = image.trim();
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          message: "No product details provided for update"
        });
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { id: productId },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      return res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct
      });

    } catch (error) {
      console.error("Update Product Error:", error);

      if (error.code === 11000) {
        return res.status(409).json({
          message: "Product ID already exists. Please try again."
        });
      }

      return res.status(500).json({
        message: "Failed to update product"
      });
    }
  }
);

// Admin: Delete Product
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const productId = Number(req.params.id);

      if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
          message: "Invalid product ID"
        });
      }

      const deletedProduct = await Product.findOneAndDelete({
        id: productId
      });

      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct
      });

    } catch (error) {
      console.error("Delete Product Error:", error);

      return res.status(500).json({
        message: "Failed to delete product"
      });
    }
  }
);

module.exports = router;
