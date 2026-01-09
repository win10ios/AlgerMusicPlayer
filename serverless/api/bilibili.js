// serverless/api/bilibili.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// B站搜索
router.get('/search', async (req, res) => {
  try {
    const { keyword, page = 1, pagesize = 20, search_type = 'video' } = req.query;

    console.log('B站搜索请求:', { keyword, page, pagesize, search_type });

    // B站搜索 API
    const searchUrl = `https://api.bilibili.com/x/web-interface/search/all?keyword=${encodeURIComponent(keyword)}&page=${page}&pagesize=${pagesize}&search_type=${search_type}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://www.bilibili.com'
      }
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('B站搜索错误:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 获取B站视频详情
router.get('/video/detail', async (req, res) => {
  try {
    const { bvid } = req.query;

    console.log('获取B站视频详情:', bvid);

    const detailUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;

    const response = await fetch(detailUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://www.bilibili.com'
      }
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('获取B站视频详情错误:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 获取B站视频播放地址
router.get('/playurl', async (req, res) => {
  try {
    const { bvid, cid, qn = 0, fnval = 80, fnver = 0, fourk = 1 } = req.query;

    console.log('获取B站播放地址:', { bvid, cid, qn, fnval, fnver, fourk });

    const playUrl = `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=${qn}&fnval=${fnval}&fnver=${fnver}&fourk=${fourk}`;

    const response = await fetch(playUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://www.bilibili.com'
      }
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('获取B站播放地址错误:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

// B站流代理（用于解决跨域问题）
router.get('/stream-proxy', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ code: 400, message: 'URL is required' });
    }

    console.log('B站流代理:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://www.bilibili.com'
      }
    });

    // 设置响应头
    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') || 'application/octet-stream'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Range');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range');

    // 支持范围请求
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : response.headers.get('content-length') - 1;

      const chunkSize = end - start + 1;
      res.status(206);
      res.setHeader(
        'Content-Range',
        `bytes ${start}-${end}/${response.headers.get('content-length')}`
      );
      res.setHeader('Content-Length', chunkSize);

      // 获取指定范围的数据
      const buffer = await response.buffer();
      res.send(buffer.slice(start, end + 1));
    } else {
      // 返回完整文件
      const buffer = await response.buffer();
      res.send(buffer);
    }
  } catch (error) {
    console.error('B站流代理错误:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
