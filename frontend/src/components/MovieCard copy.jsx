import { useState, useEffect } from "react";
import api from "../api";

function MovieCard({ movie }) {

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
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

      const res = await api.post(`/movies/${movie.id}/summarize`);
      setSummary(res.data.summary);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <article style={styles.card}>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.title}
        style={styles.image}
      />

      <div style={styles.content}>

        <h3 style={styles.title}>{movie.title}</h3>

        <p style={styles.rating}>⭐ {movie.vote_average}</p>

        <p style={styles.desc}>
          {movie.overview?.slice(0, 90)}...
        </p>

        {/* 🤖 AI summary */}
        {summary && (
          <p style={styles.summary}>
            🤖 {summary}
          </p>
        )}

        {/* 🔥 BUTTONS (VERTICAL) */}
        <div style={styles.buttons}>

          {isInWatchlist ? (
            <button style={styles.inWatchlist} disabled>
              ✓ In Watchlist
            </button>
          ) : (
            <button
              onClick={addToWatchlist}
              disabled={loading}
              style={styles.addBtn}
            >
              {loading ? "Adding..." : "+ Add to Watchlist"}
            </button>
          )}

          <button
            onClick={getSummary}
            disabled={loadingSummary}
            style={styles.aiBtn}
          >
            {loadingSummary ? "Generating..." : "Get AI Summary"}
          </button>

        </div>

      </div>
    </article>
  );
}

/* 🎨 UPDATED STYLES */
const styles = {
  card: {
    background: "#1e1e1e",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  content: {
    padding: "12px",
  },
  title: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  rating: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#ccc",
  },
  desc: {
    fontSize: "13px",
    color: "#aaa",
    marginBottom: "10px",
  },
  summary: {
    fontSize: "13px",
    color: "cyan",
    marginBottom: "10px",
  },

  // 🔥 IMPORTANT CHANGE
  buttons: {
    display: "flex",
    flexDirection: "column", // 👈 vertical
    gap: "8px",
  },

  addBtn: {
    padding: "8px",
    background: "#e50914",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  inWatchlist: {
    padding: "8px",
    background: "green",
    border: "none",
    color: "white",
    borderRadius: "6px",
  },

  aiBtn: {
    padding: "8px",
    background: "#444",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default MovieCard;

