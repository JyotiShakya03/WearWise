const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Place a new order

// Place a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // Validate order items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide order items."
      });
    }

    // Validate shipping address
    const requiredFields = [
      "fullName",
      "mobile",
      "email",
      "street",
      "city",
      "state",
      "pincode"
    ];

    if (
      !shippingAddress ||
      typeof shippingAddress !== "object" ||
      Array.isArray(shippingAddress) ||
      requiredFields.some(
        field =>
          typeof shippingAddress[field] !== "string" ||
          !shippingAddress[field].trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete delivery details."
      });
    }


    // Validate product IDs, sizes and quantities
    const allowedSizes = ["S", "M", "L", "XL", "XXL"];
    const seenItems = new Set();

for (const item of items) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return res.status(400).json({
      success: false,
      message: "Invalid order item."
    });
  }

  const rawProductId = item.productId;
  const rawQuantity = item.quantity;

  if (
    rawProductId === undefined ||
    rawProductId === null ||
    rawProductId === "" ||
    rawQuantity === undefined ||
    rawQuantity === null ||
    rawQuantity === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid product, size or quantity."
    });
  }

  const productId = Number(rawProductId);
  const quantity = Number(rawQuantity);
  const size = item.size;

  if (
    !Number.isInteger(productId) ||
    productId <= 0 ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 10 ||
    !allowedSizes.includes(size)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid product, size or quantity."
    });
  }

  const itemKey = `${productId}-${size}`;

  if (seenItems.has(itemKey)) {
    return res.status(400).json({
      success: false,
      message: "Duplicate product and size entries are not allowed."
    });
  }

  seenItems.add(itemKey);
}
    // Fetch actual products and prices from MongoDB
    const productIds = [
      ...new Set(items.map(item => Number(item.productId)))
    ];

    const products = await Product.find({
      id: { $in: productIds }
    }).lean();

    if (products.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message: "One or more products are unavailable."
      });
    }

    const productMap = new Map(
      products.map(product => [product.id, product])
    );

    // Build trusted order items
    const verifiedItems = items.map(item => {
      const product = productMap.get(Number(item.productId));

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: item.size,
        quantity: Number(item.quantity)
      };
    });

    // Calculate totals using database prices
    const subtotal = verifiedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const deliveryCharge = subtotal >= 1999 ? 0 : 99;
    const totalAmount = subtotal + deliveryCharge;

    // Save order
    const newOrder = new Order({
      userId: req.userId,
      items: verifiedItems,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        mobile: shippingAddress.mobile.trim(),
        email: shippingAddress.email.trim(),
        street: shippingAddress.street.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        pincode: shippingAddress.pincode.trim()
      },
      subtotal,
      deliveryCharge,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: savedOrder
    });

  } catch (error) {
    console.error("Place Order Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to place order."
    });
  }
});


// Get all orders of the logged-in user
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders.",
    });
  }
});

// Admin: Get All Customer Orders
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate("userId", "name email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: orders.length,
        orders
      });

    } catch (error) {
      console.error("Admin Fetch Orders Error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to fetch all orders."
      });
    }
  }
);


// Admin: Update Order Status
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { orderStatus } = req.body;
      if (
        typeof orderStatus !== "string" ||
        !["Processing", "Shipped", "Delivered"].includes(orderStatus)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status."
        });
      }

      // Validate MongoDB order ID
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID."
        });
      }

      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found."
        });
      }

      // Define allowed status transitions
      const allowedTransitions = {
        Placed: ["Processing"],
        Processing: ["Shipped"],
        Shipped: ["Delivered"],
        Delivered: [],
        Cancelled: []
      };

      if (
        !allowedTransitions[order.orderStatus]?.includes(orderStatus)
      ) {
        return res.status(400).json({
          success: false,
          message: `Cannot change order status from ${order.orderStatus} to ${orderStatus}.`
        });
      }

      order.orderStatus = orderStatus;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Order status updated successfully.",
        order
      });

    } catch (error) {
      console.error("Update Order Status Error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to update order status."
      });
    }
  }
);


router.patch("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID."
      });
    }

    const order = await Order.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
        orderStatus: { $in: ["Placed", "Processing"] }
      },
      {
        $set: { orderStatus: "Cancelled" }
      },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found or it can no longer be cancelled."
      });
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order
    });

  } catch (error) {
    console.error("Cancel Order Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to cancel order."
    });
  }
});


module.exports = router;
