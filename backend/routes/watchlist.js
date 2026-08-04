const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");
const authMiddleware = require("../middleware/auth");

// ✅ ADD TO WATCHLIST
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "movieId required" });
    }

    const exists = await Watchlist.findOne({
      userId: req.user.id,
      movieId
    });

    if (exists) {
      return res.status(400).json({ message: "Already in watchlist" });
    }

    const item = await Watchlist.create({
      userId: req.user.id,
      movieId
    });

    res.json(item);

  } catch (err) {
    console.error("Watchlist add error:", err.message);
    res.status(500).json({ message: "Error adding to watchlist" });
  }
});


// ✅ GET WATCHLIST
router.get("/", authMiddleware, async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id })
      .populate("movieId");

    res.json(list);

  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: "Error fetching watchlist" });
  }
});


// ✅ DELETE FROM WATCHLIST
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from watchlist" });

  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Error deleting" });
  }
});

module.exports = router;
