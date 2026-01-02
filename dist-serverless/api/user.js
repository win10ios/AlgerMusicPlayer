// serverless/api/user.js
const express = require('express');
const router = express.Router();

// 用户功能 API
router.get('/info', async (req, res) => {
  try {
    // 模拟用户信息响应
    res.json({
      code: 200,
      data: {
        id: 1,
        nickname: 'Serverless User',
        avatar: 'https://via.placeholder.com/100',
        level: 10,
        listenSongs: 1234
      }
    });
  } catch (error) {
    console.error('User Info Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.get('/play-history', async (req, res) => {
  try {
    // 模拟播放历史响应
    res.json({
      code: 200,
      data: {
        list: [
          { id: 1, name: 'Song 1', artist: 'Artist 1', time: Date.now() - 3600000 },
          { id: 2, name: 'Song 2', artist: 'Artist 2', time: Date.now() - 7200000 }
        ]
      }
    });
  } catch (error) {
    console.error('Play History Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 模拟登录响应
    res.json({
      code: 200,
      data: {
        token: 'mock-token-' + Date.now(),
        user: {
          id: 1,
          nickname: username
        }
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
