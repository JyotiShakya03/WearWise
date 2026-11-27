const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
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

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: {
  type: [cartItemSchema],
  default: [],
  validate: {
    validator: function (items) {
      const seen = new Set();

      return items.every((item) => {
        const key = `${item.productId}-${item.size}`;

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);
        return true;
      });
    },
    message: "Duplicate product and size entries are not allowed."
  }
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);