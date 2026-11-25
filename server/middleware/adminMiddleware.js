
const adminMiddleware = (req, res, next) => {
  if (!req.userId || req.userRole !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required."
    });
  }

  next();
};

module.exports = adminMiddleware;
