const axios = require('axios');

exports.getStats = async (req, res) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.YOUTUBE_CHANNEL_ID}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await axios.get(url);
    const stats = response.data.items[0].statistics;

    res.json({
      subscribers: stats.subscriberCount,
      views: stats.viewCount,
      videos: stats.videoCount,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube stats' });
  }
};
