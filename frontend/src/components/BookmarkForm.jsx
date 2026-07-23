import { useState } from 'react';
import api from '../api.js';

const CATEGORIES = ['Trailer', 'Review', 'Streaming Link', 'General'];

function BookmarkForm({ onAdded }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [relatedMovie, setRelatedMovie] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setError('Title and URL are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const res = await api.post('/bookmarks', { title, url, category, relatedMovie });
      onAdded(res.data);
      setTitle('');
      setUrl('');
      setRelatedMovie('');
    } catch (err) {
      setError('Could not save this bookmark. Is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card bookmark-form" onSubmit={handleSubmit}>
      <h3>Add a bookmark</h3>
      <div className="form-row">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="url"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Related movie (optional)"
          value={relatedMovie}
          onChange={(e) => setRelatedMovie(e.target.value)}
        />
      </div>
      {error && <p className="status-message error small">{error}</p>}
      <button type="submit" disabled={submitting} className="primary">
        {submitting ? 'Saving…' : 'Save Bookmark'}
      </button>
    </form>
  );
}

export default BookmarkForm;
