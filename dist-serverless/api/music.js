// serverless/api/music.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 音乐播放相关的 API
// 代理网易云 API 请求
router.use('/ncm-proxy', async (req, res) => {
  try {
    // 在 serverless 环境中，我们代理请求到 netease-cloud-music-api 服务
    const { path: apiPath, ...params } = req.query;

    console.log('Received NCM proxy request:', req.method, apiPath || req.path, params);

    // 构建目标 URL，连接到 netease-cloud-music-api 服务
    const queryString = new URLSearchParams(params).toString();
    const targetUrl = `http://localhost:30488${apiPath || req.path}${queryString ? '?' + queryString : ''}`;

    // 代理请求到 NCM API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
        // 移除可能导致错误的头部
        'content-length': undefined
      },
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('NCM Proxy Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

// 音乐解锁功能（在 serverless 环境中）
router.post('/unblock', async (req, res) => {
  try {
    const { id, songData, enabledSources } = req.body;

    console.log('Unblock request for:', id);

    // 在 serverless 环境中，使用 @unblockneteasemusic/server 进行音乐解锁
    const unblock = require('@unblockneteasemusic/server');

    try {
      const result = await unblock(
        id,
        songData,
        enabledSources || ['kugou', 'kuwo', 'migu', 'bilibili']
      );
      res.json({
        success: true,
        ...result
      });
    } catch (unblockError) {
      console.error('Unblock failed:', unblockError);
      // 返回错误响应
      res.json({
        success: false,
        error: unblockError.message
      });
    }
  } catch (error) {
    console.error('Unblock Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 直接代理到 netease-cloud-music-api 的特定端点
router.all('/api/*', async (req, res) => {
  try {
    const targetUrl = `http://localhost:30488${req.url.replace('/api/music/api', '')}`;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
        'content-length': undefined
      },
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
