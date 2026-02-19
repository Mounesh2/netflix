const express = require('express');
const axios = require('axios');

const router = express.Router();
const OMDB_BASE = 'http://www.omdbapi.com/';

// GET /api/movies/search?s=guardians  (must be before /:id)
router.get('/search', async (req, res) => {
  try {
    const apiKey = req.app.get('omdbApiKey') || process.env.OMDB_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'OMDB_API_KEY is not configured on the server.' });
    }
    const { s } = req.query;
    if (!s || typeof s !== 'string') {
      return res.status(400).json({ error: 'Query parameter "s" (search term) is required.' });
    }
    const { data } = await axios.get(OMDB_BASE, {
      params: { apikey: apiKey, s: s.trim() },
      timeout: 10000,
    });
    if (data.Response === 'False') {
      console.log('OMDb search no results:', data.Error || 'Unknown');
      return res.json({ Search: [], totalResults: '0', Response: 'True' });
    }
    res.json(data);
  } catch (err) {
    const msg = err.response?.data?.Error || err.message;
    console.error('OMDb search error:', msg);
    res.status(502).json({ error: 'Failed to search movies.', detail: msg });
  }
});

// GET /api/movies/:id  (e.g. tt3896198)
router.get('/:id', async (req, res) => {
  try {
    const apiKey = req.app.get('omdbApiKey') || process.env.OMDB_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'OMDB_API_KEY is not configured on the server.' });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Movie ID (imdbID) is required.' });
    }
    const { data } = await axios.get(OMDB_BASE, {
      params: { apikey: apiKey, i: id },
    });
    if (data.Response === 'False') {
      return res.status(404).json({ error: 'Movie not found.' });
    }
    res.json(data);
  } catch (err) {
    console.error('OMDb movie by id error:', err.message);
    res.status(502).json({ error: 'Failed to fetch movie.' });
  }
});

module.exports = router;
