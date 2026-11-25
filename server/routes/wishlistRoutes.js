
const express = require("express");
const router = express.Router();

const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// GET: Fetch logged-in user's wishlist
router.get("/", authMiddleware, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: req.userId,
        products: []
      });
    }

    res.status(200).json(wishlist.products);

} catch (error) {
  console.error("Fetch Wishlist Error:", error.message);

  if (error.code === 11000) {
    const wishlist = await Wishlist.findOne({
      userId: req.userId
    });

    if (wishlist) {
      return res.status(200).json(wishlist.products);
    }
  }

  return res.status(500).json({
    message: "Failed to fetch wishlist"
  });
}
});

// POST: Add or remove a product from wishlist
router.post("/toggle", authMiddleware, async (req, res) => {
  try {
const rawProductId = req.body.productId;

if (
  rawProductId === undefined ||
  rawProductId === null ||
  rawProductId === "" ||
  !Number.isInteger(Number(rawProductId)) ||
  Number(rawProductId) <= 0
) {
  return res.status(400).json({
    message: "A valid product ID is required"
  });
}

const productId = Number(rawProductId);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        message: "A valid product ID is required"
      });
    }

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let wishlist = await Wishlist.findOne({ userId: req.userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: req.userId,
        products: []
      });
    }

    if (wishlist.products.includes(productId)) {
      wishlist.products = wishlist.products.filter(
        id => id !== productId
      );
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.status(200).json({
      message: "Wishlist updated successfully",
      products: wishlist.products
    });

  } catch (error) {
    console.error("Update Wishlist Error:", error.message);
    res.status(500).json({
      message: "Failed to update wishlist"
    });
  }
});

module.exports = router;
