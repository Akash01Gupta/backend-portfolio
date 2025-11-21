require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ROUTES IMPORTS
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const aboutRoutes = require('./routes/about');
const publicProjects = require('./routes/projects');
const messageRoutes = require('./routes/messages');

// API ROUTES
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/admin/about', aboutRoutes);
app.use('/api/admin/messages', messageRoutes);
app.use('/api/projects', publicProjects);

// ==============================
// Serve Frontend in Production
// ==============================
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, 'Software-portfolio', 'dist'); // Use 'build' if CRA

  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ==============================
// MongoDB + Server Start
// ==============================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected 🚀');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => console.error('DB error:', err));
