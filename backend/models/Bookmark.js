const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true, default: 'General' },
  // Plain text, optional - which movie this link relates to. Not a
  // foreign key on purpose: bookmarks can exist independently of the
  // movie catalog (e.g. a general "best movies 2026" article).
  relatedMovie: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
