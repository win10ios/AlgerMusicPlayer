// serverless/api/music.js
const express = require('express');
const router = express.Router();

// 通用函数来调用 netease-cloud-music-api-alger 模块（serverless 兼容）
async function callNcmModule(modulePath, query, body = null) {
  try {
    // 检查并模拟全局 request 库
    if (typeof global.request === 'undefined') {
      const fetch = require('node-fetch');
      global.request = function (options, callback) {
        const { url, method = 'GET', headers = {}, body } = options;

        fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined
        })
          .then((res) => res.json())
          .then((data) => {
            if (callback) callback(null, { statusCode: res.status }, data);
          })
          .catch((err) => {
            if (callback) callback(err, null, null);
          });
      };

      global.request.jar = () => ({});
      global.request.defaults = () => global.request;
    }

    console.log(`Attempting to load NCM module: ${modulePath}`);

    // 尝试加载模块
    let apiModule;
    const possiblePaths = [
      `netease-cloud-music-api-alger/module/${modulePath}`,
      `netease-cloud-music-api-alger/module/${modulePath}.js`,
      `netease-cloud-music-api-alger/modules/${modulePath}`,
      `netease-cloud-music-api-alger/modules/${modulePath}.js`,
      `netease-cloud-music-api-alger/${modulePath}`,
      `netease-cloud-music-api-alger/${modulePath}.js`
    ];

    for (const path of possiblePaths) {
      try {
        apiModule = require(path);
        console.log(`Successfully loaded module: ${path}`);
        break;
      } catch (loadError) {
        continue;
      }
    }

    if (!apiModule) {
      throw new Error(`Could not load NCM module: ${modulePath}`);
    }

    // 创建 request 函数
    const requestFunction = async (path, data, options = {}) => {
      const url = path.startsWith('/') ? `https://music.163.com${path}` : path;
      const method = options?.method || 'POST';
      const headers = options?.headers || {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Referer: 'https://music.163.com',
        Cookie: query.cookie || ''
      };

      const fetch = require('node-fetch');
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
      });

      const resBody = await response.json();

      return {
        status: response.status,
        body: resBody,
        header: response.headers
      };
    };

    // 调用 API 模块
    const data = body || query;
    const result = await apiModule(data, requestFunction);

    return result.body || result;
  } catch (error) {
    console.error(`Error calling NCM module ${modulePath}:`, error);
    throw error;
  }
}

// 音乐 URL
router.get('/url', async (req, res) => {
  try {
    const { id, br = 999000 } = req.query;
    console.log('Music URL request:', id);
    const result = await callNcmModule('song/url', { id, br: parseInt(br), ...req.query });
    res.json(result);
  } catch (error) {
    console.error('Music URL error:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 音乐详情
router.get('/detail', async (req, res) => {
  try {
    const { ids } = req.query;
    console.log('Music detail request:', ids);
    const result = await callNcmModule('song/detail', { ids, ...req.query });
    res.json(result);
  } catch (error) {
    console.error('Music detail error:', error);
    res.status(500).json({ code: 500, message: error.message });
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

module.exports = router;
