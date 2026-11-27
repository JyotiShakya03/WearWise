
const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      name.trim().length > 100 ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 8 ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: "Enter valid details. Password must be 8–128 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });
    
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

 } catch (error) {
  console.error("Registration Error:", error.message);

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Email already registered"
    });
  }

  return res.status(500).json({
    message: "Registration failed"
  });
}
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

if (
  typeof email !== "string" ||
  typeof password !== "string" ||
  !email.trim() ||
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
  password.length < 1 ||
  password.length > 128
) {
  return res.status(400).json({
    message: "Enter valid email and password."
  });
}

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

      if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server authentication configuration error."
      });
    }  

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
        algorithm: "HS256"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      message: "Login failed"
    });
  }
});

// Get All Customers (Admin Only)
router.get(
  "/customers",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const customers = await User.find(
        { role: "customer" },
        "name email createdAt"
      ).sort({ createdAt: -1 });


      res.status(200).json({
        success: true,
        totalCustomers: customers.length,
        customers
      });

    } catch (error) {
      console.error("Get Customers Error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to fetch customers."
      });
    }
  }
);

// Get Total Customers (Admin Only)
router.get("/customers/count", authMiddleware, adminMiddleware, async (req, res) => {
  try {



  const totalCustomers = await User.countDocuments({
    role: "customer"
  });


  res.status(200).json({
    success: true,
    totalCustomers
  });

} catch (error) {
  console.error("Customer Count Error:", error);

  res.status(500).json({
    success: false,
    message: "Unable to fetch customer count."
  });
}
});

module.exports = router;