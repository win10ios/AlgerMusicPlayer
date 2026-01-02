// serverless/api/music.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 音乐播放相关的 API
// 重用项目中已有的网易云 API
const { serveNcmApi } = require('netease-cloud-music-api-alger/server');

// 由于 serverless 环境的限制，我们需要适配 API
// 暂时创建一个代理 API 来转发请求
router.use('/ncm-proxy', async (req, res) => {
  try {
    // 这里可以转发到外部的网易云 API 服务
    // 或者在 serverless 环境中运行 API
    console.log('Received request:', req.method, req.path);

    // 模拟 API 响应，实际部署时应该连接到真实 API
    res.json({
      code: 200,
      message: 'Music API connected in serverless environment'
    });
  } catch (error) {
    console.error('API Error:', error);
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

    // 在 serverless 环境中，需要使用不同的方式来处理音乐解锁
    // 这里是一个占位符，实际实现需要适配 serverless
    console.log('Unblock request for:', id);

    // 模拟响应
    res.json({
      success: true,
      url: `https://music.example.com/song/${id}`,
      quality: 'flac'
    });
  } catch (error) {
    console.error('Unblock Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
