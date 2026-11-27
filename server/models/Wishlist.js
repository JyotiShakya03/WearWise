
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    products: {
      type: [Number],
      default: [],
      validate: [
        {
          validator: products => new Set(products).size === products.length,
          message: "Duplicate products are not allowed."
        },
        {
          validator: products => products.length <= 100,
          message: "Wishlist cannot contain more than 100 products."
        }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
