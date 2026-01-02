// serverless/api/artist.js
const express = require('express');
const router = express.Router();

// 艺术家功能 API
router.get('/detail', async (req, res) => {
  try {
    const { id } = req.query;

    // 模拟艺术家详情响应
    res.json({
      code: 200,
      data: {
        id: id || 1,
        name: 'Artist Name',
        cover: 'https://via.placeholder.com/200',
        description: 'Artist description here',
        followCount: 1234,
        musicCount: 50,
        albumCount: 10,
        mvCount: 5
      }
    });
  } catch (error) {
    console.error('Artist Detail Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.get('/albums', async (req, res) => {
  try {
    const { id, limit = 30, offset = 0 } = req.query;

    // 模拟艺术家专辑列表响应
    res.json({
      code: 200,
      data: {
        albums: [
          {
            id: 101,
            name: 'Album 1',
            cover: 'https://via.placeholder.com/200',
            publishTime: '2023-01-01',
            description: 'Album description'
          },
          {
            id: 102,
            name: 'Album 2',
            cover: 'https://via.placeholder.com/200',
            publishTime: '2022-05-15',
            description: 'Album description'
          }
        ],
        total: 2
      }
    });
  } catch (error) {
    console.error('Artist Albums Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.get('/mvs', async (req, res) => {
  try {
    const { id, limit = 30, offset = 0 } = req.query;

    // 模拟艺术家 MV 列表响应
    res.json({
      code: 200,
      data: {
        mvs: [
          {
            id: 1001,
            name: 'MV 1',
            cover: 'https://via.placeholder.com/400',
            duration: 245,
            playCount: 12345
          }
        ],
        total: 1
      }
    });
  } catch (error) {
    console.error('Artist MVs Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
