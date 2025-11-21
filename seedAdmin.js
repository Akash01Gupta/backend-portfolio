require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Check if admin exists
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log("Admin already exists:", existing.email);

      // Generate token for existing admin
      const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      console.log("\nYour Admin Token:");
      console.log("Bearer " + token);
      process.exit();
    }

    // Create new admin
    const hashed = await bcrypt.hash(process.env.ADMIN_PASS, 10);
    const admin = await Admin.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashed,
    });

    console.log("Created new admin:", admin.email);

    // Generate token for new admin
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("\nYour Admin Token:");
    console.log("Bearer " + token);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
