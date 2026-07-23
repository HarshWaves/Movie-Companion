import { useState, useEffect } from "react";
import api from "../api";

function MovieCard({ movie }) {

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    checkWatchlist();
  }, []);

  const checkWatchlist = async () => {
    try {
      const res = await api.get("/watchlist");

      const exists = res.data.some(
        (item) => item.movieId?.tmdbId === movie.id
      );

      setIsInWatchlist(exists);
    } catch (err) {
      console.error(err);
    }
  };

  const addToWatchlist = async () => {
    try {
      setLoading(true);

      const saveRes = await api.post("/movies/save", movie);
      const savedMovie = saveRes.data;

      await api.post("/watchlist", {
        movieId: savedMovie._id
      });

      setIsInWatchlist(true);

    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      setLoadingSummary(true);
      setSummaryError(null);

      const res = await api.post(`/movies/${movie.id}/summarize`);
      setSummary(res.data.summary);

    } catch (err) {
      setSummaryError("Could not generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <article className="card movie-card">

      {/* ✅ Poster (NEW logic + OLD UI style) */}
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.title}
        className="movie-poster"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450";
        }}
      />

      <div className="movie-card-content">

        <div className="movie-card-header">
          <h3>{movie.title}</h3>
          <span className="badge">
            {movie.release_date?.split("-")[0]}
          </span>
        </div>

        <p className="genre">
          🎬 Movie
        </p>

        <p className="rating">
          ⭐ {movie.vote_average}
        </p>

        <p className="description">
          {movie.overview?.slice(0, 120)}...
        </p>

        {summary && (
          <p className="summary-text">
            🤖 {summary}
          </p>
        )}

        {summaryError && (
          <p className="status-message error small">
            {summaryError}
          </p>
        )}

        <div className="card-actions">

          <button
            onClick={addToWatchlist}
            disabled={isInWatchlist || loading}
            className="primary"
          >
            {isInWatchlist
              ? "✓ In Watchlist"
              : loading
              ? "Adding..."
              : "＋ Add to Watchlist"}
          </button>

          <button
            onClick={getSummary}
            disabled={loadingSummary}
            className="secondary"
          >
            {loadingSummary
              ? "Generating..."
              : summary
              ? "Regenerate Summary"
              : "Get AI Summary"}
          </button>

        </div>

      </div>

    </article>
  );
}

export default MovieCard;