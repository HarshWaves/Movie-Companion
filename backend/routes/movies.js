const express = require("express");
const router = express.Router();
const axios = require("axios");
const Movie = require("../models/Movie");

// 🎬 TMDB movies (pagination support)
router.get("/tmdb", async (req, res) => {
  try {
    const page = req.query.page || 1;

    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          page: page
        }
      }
    );

    res.json(response.data.results);

  } catch (err) {
    console.error("TMDB error:", err.message);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});


// 🔍 SEARCH MOVIES (FIXED)
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    console.log("SEARCH QUERY:", query);

    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          query: query
        }
      }
    );

    res.json(response.data.results);

  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ message: "Search failed" });
  }
});


// ✅ SAVE MOVIE
router.post("/save", async (req, res) => {
  try {
    const m = req.body;

    let movie = await Movie.findOne({ tmdbId: m.id });

    if (!movie) {
      movie = await Movie.create({
        tmdbId: m.id,
        title: m.title,
        overview: m.overview,
        posterPath: m.poster_path,
        releaseDate: m.release_date,
        rating: m.vote_average
      });
    }

    res.json(movie);

  } catch (err) {
    console.error("Save error:", err.message);
    res.status(500).json({ message: "Error saving movie" });
  }
});


// 🤖 AI SUMMARY
router.post("/:id/summarize", async (req, res) => {
  try {
    const movieId = req.params.id;

    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY
        }
      }
    );

    const movie = movieRes.data;

    const aiRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.AI_MODEL || "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Give a short summary of the movie "${movie.title}". Plot: ${movie.overview}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const summary = aiRes.data.choices[0].message.content;

    res.json({ summary });

  } catch (err) {
    console.error("AI error:", err.response?.data || err.message);
    res.status(500).json({ message: "AI summary failed" });
  }
});

module.exports = router;