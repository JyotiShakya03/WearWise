
const express = require("express");
const router = express.Router();

const ContactMessage = require("../models/ContactMessage");
const authMiddleware = require("../middleware/authMiddleware");

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  next();
};

// Submit Contact Form (Public)
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof subject !== "string" ||
        typeof message !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !subject.trim() ||
        !message.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }

      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanSubject = subject.trim();
      const cleanMessage = message.trim();

      if (
        cleanName.length > 100 ||
        cleanEmail.length > 254 ||
        cleanSubject.length > 150 ||
        cleanMessage.length > 2000
      ) {
        return res.status(400).json({
          success: false,
          message: "One or more fields exceed the allowed length.",
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address.",
        });
      }

    const newMessage = await ContactMessage.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

// Get All Messages (Admin Only)
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch messages.",
    });
  }
});

// Update Message Status (Admin Only)
router.patch("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["New", "Read", "Replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message status.",
      });
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update message.",
    });
  }
});

// Delete Message (Admin Only)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete message.",
    });
  }
});

module.exports = router;
