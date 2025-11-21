require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express.json());
app.use(morgan('dev'));

// ROUTES IMPORT
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const aboutRoutes = require('./routes/about');
const messageRoutes = require('./routes/messages');

// API ROUTES
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/admin/about', aboutRoutes);
app.use('/api/admin/messages', messageRoutes);
app.use('/api/projects', projectRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Portfolio API Running...");
});

// START SERVER AFTER DB CONNECTION
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected 🚀');
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  })
  .catch(err => console.error("DB connection error ❌", err));
