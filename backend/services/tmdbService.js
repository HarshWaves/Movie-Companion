const axios = require("axios");
const Movie = require("../models/Movie");

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const fetchAndStoreMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

  const response = await axios.get(url);

  const movies = response.data.results;

  for (let m of movies) {

    const exists = await Movie.findOne({ tmdbId: m.id });

    if (!exists) {
      await Movie.create({
        tmdbId: m.id,
        title: m.title,
        overview: m.overview,
        posterPath: m.poster_path,
        releaseDate: m.release_date,
        rating: m.vote_average
      });
    }
  }

  return await Movie.find().sort({ _id: -1 });
};

module.exports = { fetchAndStoreMovies };