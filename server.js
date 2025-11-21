require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// =============================
// Middlewares
// =============================
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://portfolio-frontend.vercel.app" // replace with your real Vercel URL
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// =============================
// ROUTES
// =============================
const authRoutes = require('./routes/auth');
const adminProjectRoutes = require('./routes/adminProjects'); // 🔹 NEW separated routes
const publicProjectRoutes = require('./routes/publicProjects'); // 🔹 NEW separated routes
const aboutRoutes = require('./routes/about');
const messageRoutes = require('./routes/messages');

// ADMIN API ROUTES (Protected)
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/about', aboutRoutes);
app.use('/api/admin/messages', messageRoutes);

// Public routes (No token needed)
app.use('/api/projects', publicProjectRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).send("Backend Portfolio API Running 🚀");
});

// =============================
// DB + Server Start
// =============================
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected 🚀");
    app.listen(PORT, () =>
      console.log(`Server running on PORT ${PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error ❌", err));
