// serverless/api/playlist.js
const express = require('express');
const router = express.Router();

// 播放列表功能 API
router.get('/list', async (req, res) => {
  try {
    // 模拟播放列表列表响应
    res.json({
      code: 200,
      data: {
        playlists: [
          {
            id: 1,
            name: 'My Favorite Songs',
            cover: 'https://via.placeholder.com/200',
            creator: 'Serverless User',
            trackCount: 25,
            playCount: 12345
          },
          {
            id: 2,
            name: 'Chill Vibes',
            cover: 'https://via.placeholder.com/200',
            creator: 'Serverless User',
            trackCount: 30,
            playCount: 9876
          }
        ]
      }
    });
  } catch (error) {
    console.error('Playlist List Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;

    // 模拟播放列表详情响应
    res.json({
      code: 200,
      data: {
        id: id || 1,
        name: 'My Favorite Songs',
        cover: 'https://via.placeholder.com/200',
        creator: 'Serverless User',
        description: 'A collection of my favorite songs',
        tracks: [
          { id: 101, name: 'Song 1', artist: 'Artist 1', duration: 245 },
          { id: 102, name: 'Song 2', artist: 'Artist 2', duration: 198 },
          { id: 103, name: 'Song 3', artist: 'Artist 3', duration: 210 }
        ]
      }
    });
  } catch (error) {
    console.error('Playlist Detail Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { name, description } = req.body;

    // 模拟创建播放列表响应
    res.json({
      code: 200,
      data: {
        id: Date.now(),
        name,
        description,
        cover: 'https://via.placeholder.com/200'
      }
    });
  } catch (error) {
    console.error('Playlist Create Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
