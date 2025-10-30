const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// This route gets a list of recent videos (you can keep it)
router.get('/videos', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,
        key: API_KEY,
        order: 'date',
        maxResults: 10,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching youtube videos:', err);
    res.status(500).json({ message: 'Failed to fetch YouTube videos' });
  }
});

// *** ADD THIS NEW ROUTE ***
// This route gets the channel's public statistics
router.get('/stats', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'statistics', // We are asking for the 'statistics' part
        id: CHANNEL_ID,     // For this specific channel
        key: API_KEY,       // Using our secret key
      },
    });

    // The data is nested, so let's simplify it
    const stats = response.data.items[0].statistics;
    res.json({
      subscribers: stats.subscriberCount,
      views: stats.viewCount,
      videos: stats.videoCount,
    });
  } catch (err) {
    console.error('Error fetching youtube stats:', err);
    res.status(500).json({ message: 'Failed to fetch YouTube stats' });
  }
});

module.exports = router;
