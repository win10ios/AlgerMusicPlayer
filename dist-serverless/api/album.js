// serverless/api/album.js
const express = require('express');
const router = express.Router();

// 专辑功能 API
router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;

    // 模拟专辑详情响应
    res.json({
      code: 200,
      data: {
        id: id || 1,
        name: 'Album Name',
        cover: 'https://via.placeholder.com/200',
        description: 'Album description here',
        artist: {
          id: 1,
          name: 'Artist Name'
        },
        publishTime: '2023-01-01',
        size: 10,
        tracks: [
          {
            id: 101,
            name: 'Track 1',
            artist: 'Artist Name',
            duration: 245
          },
          {
            id: 102,
            name: 'Track 2',
            artist: 'Artist Name',
            duration: 198
          }
        ]
      }
    });
  } catch (error) {
    console.error('Album Detail Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.get('/list', async (req, res) => {
  try {
    const { limit = 30, offset = 0, artistId } = req.query;

    // 模拟专辑列表响应
    res.json({
      code: 200,
      data: {
        albums: [
          {
            id: 101,
            name: 'Album 1',
            cover: 'https://via.placeholder.com/200',
            publishTime: '2023-01-01',
            size: 10,
            artist: artistId ? null : { id: 1, name: 'Artist Name' }
          },
          {
            id: 102,
            name: 'Album 2',
            cover: 'https://via.placeholder.com/200',
            publishTime: '2022-05-15',
            size: 12,
            artist: artistId ? null : { id: 1, name: 'Artist Name' }
          }
        ],
        total: 2
      }
    });
  } catch (error) {
    console.error('Album List Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
