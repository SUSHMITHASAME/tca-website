const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/youtubeController');

router.get('/', getStats);

module.exports = router;
