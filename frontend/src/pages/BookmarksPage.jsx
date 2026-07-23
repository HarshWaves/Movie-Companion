import { useState, useEffect } from 'react';
import api from '../api.js';
import BookmarkForm from '../components/BookmarkForm.jsx';

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookmarks');
      setBookmarks(res.data);
      setError(null);
    } catch (err) {
      setError('Could not load bookmarks. Is the backend running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  const handleAdded = (newBookmark) => {
    setBookmarks((prev) => [newBookmark, ...prev]);
  };

  const removeBookmark = async (id) => {
    if (!window.confirm('Delete this bookmark?')) return;
    try {
      await api.delete(`/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert('Could not delete bookmark');
    }
  };

  // Grouping happens here in the frontend, not the backend - matches
  // the "grouping data in the frontend" focus skill from the source project.
  const grouped = bookmarks.reduce((acc, bookmark) => {
    const key = bookmark.category || 'General';
    if (!acc[key]) acc[key] = [];
    acc[key].push(bookmark);
    return acc;
  }, {});

  return (
    <div>
      <BookmarkForm onAdded={handleAdded} />

      {loading && <p className="status-message">Loading bookmarks…</p>}
      {error && <p className="status-message error">{error}</p>}
      {!loading && !error && bookmarks.length === 0 && (
        <p className="status-message">No bookmarks yet. Add one above.</p>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="bookmark-group">
          <h3>{category}</h3>
          <div className="list">
            {items.map((b) => (
              <div key={b._id} className="list-row">
                <div>
                  <a href={b.url} target="_blank" rel="noreferrer">
                    <strong>{b.title}</strong>
                  </a>
                  {b.relatedMovie && <span className="muted"> · {b.relatedMovie}</span>}
                </div>
                <button onClick={() => removeBookmark(b._id)} className="danger">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default BookmarksPage;
