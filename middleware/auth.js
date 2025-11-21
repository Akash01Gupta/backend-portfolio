const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(401).json({ message: "Invalid token" });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ⭐ ADD THIS
exports.isAdmin = (req, res, next) => {
  if (!req.admin) return res.status(401).json({ message: "Not authorized" });

  // If you plan multiple roles, you can check here
  // Example: if (req.admin.role !== "admin") return res.status(403).json({ message: "Forbidden" });

  next();
};
