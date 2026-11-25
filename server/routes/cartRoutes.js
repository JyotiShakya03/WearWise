const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// GET: Fetch logged-in user's cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.userId
    });

    if (!cart) {
      return res.status(200).json([]);
    }

    res.status(200).json(cart.items);

  } catch (error) {
    console.error("Fetch Cart Error:", error);

    res.status(500).json({
      message: "Failed to fetch cart"
    });
  }
});


// POST: Add a product to the logged-in user's cart
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    if (
      !Number.isInteger(productId) || productId <= 0 ||
      !["S", "M", "L", "XL", "XXL"].includes(size) ||
      !Number.isInteger(quantity) ||
      quantity < 1 || quantity > 10
    ) {
      return res.status(400).json({
        message: "Invalid product, size or quantity"
      });
    }

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({
      userId: req.userId
    });

    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId === productId &&
        item.size === size
    );

    if (existingItem) {
  if (existingItem.quantity + quantity > 10) {
    return res.status(400).json({
      message: "Maximum quantity allowed per product and size is 10."
    });
  }

  existingItem.quantity += quantity;
}
 else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        quantity
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      items: cart.items
    });

  } catch (error) {
    console.error("Add to Cart Error:", error);

    res.status(500).json({
      message: "Failed to add product to cart"
    });
  }
});


// PUT: Update quantity of a cart item
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;

    if (
      !Number.isInteger(productId) || productId <= 0 ||
      !["S", "M", "L", "XL", "XXL"].includes(size) ||
      !Number.isInteger(quantity) ||
      quantity < 1 || quantity > 10
    ) {
      return res.status(400).json({
        message: "Invalid product, size or quantity"
      });
    }

    const cart = await Cart.findOne({
      userId: req.userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId === productId &&
        item.size === size
    );

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cart quantity updated successfully",
      items: cart.items
    });

  } catch (error) {
    console.error("Update Cart Error:", error);

    res.status(500).json({
      message: "Failed to update cart quantity"
    });
  }
});


// DELETE: Remove a product from the cart
router.delete("/remove", authMiddleware, async (req, res) => {
  try {
    const { productId, size } = req.body;

    if (
      !Number.isInteger(productId) || productId <= 0 ||
      !["S", "M", "L", "XL", "XXL"].includes(size)
    ) {
      return res.status(400).json({
        message: "Invalid product or size"
      });
    }

    const cart = await Cart.findOne({
      userId: req.userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        !(item.productId === productId && item.size === size)
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      items: cart.items
    });

  } catch (error) {
    console.error("Remove Cart Error:", error);

    res.status(500).json({
      message: "Failed to remove product from cart"
    });
  }
});


// Clear the entire cart after successful order placement
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { $set: { items: [] } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Cart cleared successfully!",
      items: cart ? cart.items : [],
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to clear cart.",
    });
  }
});

module.exports = router;
