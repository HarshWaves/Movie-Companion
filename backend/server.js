require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// ✅ Routes import
const moviesRouter = require('./routes/movies');
const watchlistRouter = require('./routes/watchlist');
const bookmarksRouter = require('./routes/bookmarks');
const authRoutes = require('./routes/auth');   // ✅ ADD HERE (upar)


const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Movie Companion API is running');
});

// ✅ API routes
app.use('/api/movies', moviesRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/auth', authRoutes);   // ✅ ADD HERE (upar shift kiya)

// ✅ Port
const PORT = process.env.PORT || 5000;

// ❌ Agar MONGO_URI missing ho
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing in .env file');
  process.exit(1);
}

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });