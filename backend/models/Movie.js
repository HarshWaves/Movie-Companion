const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true   // ✅ duplicate रोकता है
  },
  title: String,
  overview: String,
  posterPath: String,
  releaseDate: String,
  rating: Number
});

module.exports = mongoose.model('Movie', movieSchema);