// serverless/api/user.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 用户相关的 API，代理到 netease-cloud-music-api
router.get('/detail', async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({
        code: 400,
        message: 'User ID is required'
      });
    }

    console.log('User detail request:', uid);

    // 代理请求到 netease-cloud-music-api
    const targetUrl = `http://localhost:30488/user/detail?uid=${uid}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('User detail error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

// 用户歌单
router.get('/playlist', async (req, res) => {
  try {
    const { uid, limit = 30, offset = 0 } = req.query;

    if (!uid) {
      return res.status(400).json({
        code: 400,
        message: 'User ID is required'
      });
    }

    console.log('User playlist request:', uid);

    const params = new URLSearchParams({
      uid: uid,
      limit: limit.toString(),
      offset: offset.toString()
    });

    const targetUrl = `http://localhost:30488/user/playlist?${params.toString()}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('User playlist error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
