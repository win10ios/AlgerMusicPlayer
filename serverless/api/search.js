// serverless/api/search.js
const express = require('express');
const router = express.Router();

// 搜索功能 API
router.get('/suggest', async (req, res) => {
  try {
    // 搜索建议功能
    const { keywords } = req.query;

    // 模拟搜索建议响应
    res.json({
      code: 200,
      data: {
        keywords: keywords || '',
        suggestions: [
          { name: `${keywords || 'example'} song 1`, type: 'song' },
          { name: `${keywords || 'example'} playlist 1`, type: 'playlist' },
          { name: `${keywords || 'example'} artist 1`, type: 'artist' }
        ]
      }
    });
  } catch (error) {
    console.error('Search Suggest Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.get('/complete', async (req, res) => {
  try {
    // 搜索补全功能
    const { keywords } = req.query;

    // 模拟搜索补全响应
    res.json({
      code: 200,
      data: {
        keywords: keywords || '',
        completions: [
          `${keywords || 'example'} song`,
          `${keywords || 'example'} album`,
          `${keywords || 'example'} artist`
        ]
      }
    });
  } catch (error) {
    console.error('Search Complete Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
