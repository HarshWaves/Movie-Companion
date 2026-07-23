import { useEffect, useState } from "react";
import api from "../api";

function WatchlistPage() {

  const [list, setList] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const res = await api.get("/watchlist");
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/watchlist/${id}`);
      fetchWatchlist();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2 style={{ marginBottom: "20px" }}>Your Watchlist 🎬</h2>

      {list.length === 0 ? (
        <p>No movies added yet</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >

          {list.map((item) => {

            const movie = item.movieId;

            if (!movie) return null;

            return (
              <div
                key={item._id}
                style={{
                  background: "#1e1e1e",
                  borderRadius: "10px",
                  overflow: "hidden", // ✅ FIX
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                  transition: "0.2s"
                }}
              >

                <img
                  src={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : "https://via.placeholder.com/300x450"
                  }
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover" // ✅ FIX
                  }}
                />

                <div style={{ padding: "10px", textAlign: "center" }}>

                  <h3 style={{ fontSize: "16px", margin: "5px 0" }}>
                    {movie.title}
                  </h3>

                  <p>⭐ {movie.rating}</p>

                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      border: "none",
                      background: "crimson",
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default WatchlistPage;