
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true,
      enum: ["S", "M", "L", "XL", "XXL"]
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      validate: Number.isInteger
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: items => items.length > 0,
        message: "An order must contain at least one item."
      }
    },

    shippingAddress: {
      fullName: { type: String, required: true, trim: true },
mobile: {
  type: String,
  required: true,
  trim: true,
  match: /^[6-9]\d{9}$/
},

email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
},
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true }
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    deliveryCharge: {
      type: Number,
      required: true,
      min: 0
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    orderStatus: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
