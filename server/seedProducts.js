require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    id: 1,
    name: "Floral Printed Kurti",
    price: 899,
    rating: 4.5,
    category: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600"
  },
  {
    id: 2,
    name: "Emerald Anarkali Suit",
    price: 2499,
    rating: 4.8,
    category: "Ethnic Wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600"
  },
  {
    id: 3,
    name: "Casual Western Dress",
    price: 1499,
    rating: 4.3,
    category: "Western Wear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600"
  },
  {
    id: 4,
    name: "Pink Embroidered Kurti",
    price: 1199,
    rating: 4.6,
    category: "Kurtis & Suits",
    image: "https://images.unsplash.com/photo-1741847639057-b51a25d42892?w=600"
  },
  {
    id: 5,
    name: "Classic White Shirt",
    price: 999,
    rating: 4.2,
    category: "Western Wear",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600"
  },
  {
    id: 6,
    name: "Wine Party Dress",
    price: 1899,
    rating: 4.7,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600"
  },
  {
    id: 7,
    name: "Straight Fit Jeans",
    price: 1299,
    rating: 4.4,
    category: "Western Wear",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"
  },
  {
    id: 8,
    name: "Casual Denim Jacket",
    price: 1799,
    rating: 4.5,
    category: "Western Wear",
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600"
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingProduct = await Product.findOne({ id: 1 });
    console.log("Existing Product 1:", existingProduct);
    if (!existingProduct) {
      await Product.create({
        id: 1,
        name: "Floral Printed Kurti",
        price: 899,
        rating: 4.5,
        category: "Ethnic Wear",
        image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600"
      });

      console.log("Product 1 added successfully!");
    } else {
      console.log("Product 1 already exists.");
    }

  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();