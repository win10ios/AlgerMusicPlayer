// serverless/api/user.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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

// 用户详情
router.get('/detail', async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({
        code: 400,
        message: 'User ID is required'
      });
    }

    console.log('User detail request:', uid);
    const result = await callNcmModule('user/detail', { uid, ...req.query });
    res.json(result);
  } catch (error) {
    console.error('User detail error:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 用户歌单
router.get('/playlist', async (req, res) => {
  try {
    const { uid, limit = 30, offset = 0 } = req.query;

    if (!uid) {
      return res.status(400).json({
        code: 400,
        message: 'User ID is required'
      });
    }

    console.log('User playlist request:', uid);
    const result = await callNcmModule('user/playlist', {
      uid,
      limit: parseInt(limit),
      offset: parseInt(offset),
      ...req.query
    });
    res.json(result);
  } catch (error) {
    console.error('User playlist error:', error);
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
