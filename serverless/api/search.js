// serverless/api/search.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 搜索 API，代理到 netease-cloud-music-api
router.get('/suggest', async (req, res) => {
  try {
    const { keywords } = req.query;

    if (!keywords) {
      return res.status(400).json({
        code: 400,
        message: 'Keywords are required'
      });
    }

    console.log('Search suggest request:', keywords);

    // 代理请求到 netease-cloud-music-api
    const targetUrl = `http://localhost:30488/search/suggest?keywords=${encodeURIComponent(keywords)}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json({
      code: 200,
      data: {
        keywords,
        suggestions: data.result || data
      }
    });
  } catch (error) {
    console.error('Search suggest error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

// 完整搜索 API
router.get('/', async (req, res) => {
  try {
    const { keywords, type = 1, limit = 30, offset = 0 } = req.query;

    if (!keywords) {
      return res.status(400).json({
        code: 400,
        message: 'Keywords are required'
      });
    }

    console.log('Search request:', keywords, type);

    // 构建查询参数
    const params = new URLSearchParams({
      keywords: keywords,
      type: type,
      limit: limit,
      offset: offset
    });

    const targetUrl = `http://localhost:30488/search?${params.toString()}`;

    const response = await fetch(targetUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
