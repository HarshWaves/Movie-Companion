import { useEffect, useState } from "react";
import api from "../api";
import MovieCard from "../components/MovieCard";

function Catalog() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎬 Load default movies
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await api.get("/movies/tmdb?page=1");
      setMovies(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 SEARCH FUNCTION
  const searchMovies = async (query) => {
    try {
      setLoading(true);

      if (!query.trim()) {
        fetchMovies();
        return;
      }

      console.log("Searching:", query);

      const res = await api.get(`/movies/search?q=${query}`);
      setMovies(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Instant search (NO BUG NOW)
  useEffect(() => {
    searchMovies(search);
  }, [search]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Movies 🎬</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {loading && <p style={styles.message}>Loading...</p>}

      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {!loading && movies.length === 0 && (
        <p style={styles.message}>No movies found 😢</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    marginBottom: "15px",
  },
  search: {
    padding: "12px",
    width: "100%",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  message: {
    textAlign: "center",
    color: "#aaa",
  },
};

export default Catalog;