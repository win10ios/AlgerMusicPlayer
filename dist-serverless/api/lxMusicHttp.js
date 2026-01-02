// serverless/api/lxMusicHttp.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// 落雪音乐 HTTP 请求处理（在 serverless 环境中）
router.post('/request', async (req, res) => {
  try {
    const { url, options = {} } = req.body;

    if (!url) {
      return res.status(400).json({
        code: 400,
        message: 'URL is required'
      });
    }

    console.log(`[LxMusicHttp] Request: ${options.method || 'GET'} ${url}`);

    const fetchOptions = {
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...(options.headers || {})
      }
    };

    // 处理请求体
    if (options.body) {
      fetchOptions.body = options.body;
    } else if (options.form) {
      const formData = new URLSearchParams(options.form);
      fetchOptions.body = formData.toString();
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }

    // 设置超时（serverless 环境中需要注意超时限制）
    const controller = new AbortController();
    const timeout = options.timeout || 25000; // serverless 通常有时间限制

    const timeoutId = setTimeout(() => {
      console.warn(`[LxMusicHttp] Request timeout: ${url}`);
      controller.abort();
    }, timeout);

    fetchOptions.signal = controller.signal;

    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    console.log(`[LxMusicHttp] Response: ${response.status} ${url}`);

    // 读取响应体
    const rawBody = await response.text();

    // 尝试解析 JSON
    let parsedBody = rawBody;
    const contentType = response.headers.get('content-type') || '';
    if (
      contentType.includes('application/json') ||
      rawBody.startsWith('{') ||
      rawBody.startsWith('[')
    ) {
      try {
        parsedBody = JSON.parse(rawBody);
      } catch (error) {
        // 解析失败则使用原始字符串
        console.log('JSON parse error:', error.message); // 使用变量避免 ESLint 错误
      }
    }

    // 转换 headers 为普通对象
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const result = {
      statusCode: response.status,
      headers,
      body: parsedBody
    };

    res.json(result);
  } catch (error) {
    console.error(`[LxMusicHttp] Request failed:`, error.message);
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/cancel', (req, res) => {
  // 在 serverless 环境中，请求取消的逻辑可能有所不同
  // 因为每个请求都在独立的容器中执行
  res.json({
    message: 'Request cancellation is not applicable in serverless environment'
  });
});

module.exports = router;
