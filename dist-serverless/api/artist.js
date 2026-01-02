// serverless/api/artist.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 艺术家相关的 API，代理到 netease-cloud-music-api
router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        code: 400,
        message: 'Artist ID is required'
      });
    }

    console.log('Artist detail request:', id);

    // 代理请求到 netease-cloud-music-api
    const targetUrl = `http://localhost:30488/artist/detail?id=${id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Artist detail error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

// 艺术家热门歌曲
router.get('/top', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        code: 400,
        message: 'Artist ID is required'
      });
    }

    console.log('Artist top songs request:', id);

    const targetUrl = `http://localhost:30488/artist/top/song?id=${id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Artist top songs error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
