// serverless/api/playlist.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 播放列表相关的 API，代理到 netease-cloud-music-api
router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        code: 400,
        message: 'Playlist ID is required'
      });
    }

    console.log('Playlist detail request:', id);

    // 代理请求到 netease-cloud-music-api
    const targetUrl = `http://localhost:30488/playlist/track/all?id=${id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Playlist detail error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

// 播放列表信息
router.get('/info', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        code: 400,
        message: 'Playlist ID is required'
      });
    }

    console.log('Playlist info request:', id);

    const targetUrl = `http://localhost:30488/playlist/detail?id=${id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Playlist info error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
