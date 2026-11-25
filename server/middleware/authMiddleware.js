
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required. Please login."
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server authentication configuration error."
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof decoded.userId !== "string" ||
      !decoded.userId ||
      !["admin", "customer"].includes(decoded.role)
    ) {
      return res.status(401).json({
        message: "Invalid authentication token."
      });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again."
    });
  }
};

module.exports = authMiddleware;
