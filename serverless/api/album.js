// serverless/api/album.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 专辑相关的 API，代理到 netease-cloud-music-api
router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        code: 400,
        message: 'Album ID is required'
      });
    }

    console.log('Album detail request:', id);

    // 代理请求到 netease-cloud-music-api
    const targetUrl = `http://localhost:30488/album?id=${id}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Album detail error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
