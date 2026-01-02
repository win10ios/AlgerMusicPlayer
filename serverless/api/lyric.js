// serverless/api/lyric.js
const express = require('express');
const router = express.Router();

// 歌词功能 API
router.get('/get', async (req, res) => {
  try {
    const { id } = req.query;

    // 模拟歌词获取响应
    res.json({
      code: 200,
      data: {
        id: id || 0,
        lyric: `[00:00.000] 歌词加载中...\n[00:10.000] 欢迎使用 AlgerMusicPlayer\n[00:15.000] 这是在 serverless 环境中的演示`,
        tlyric: `[00:00.000] Lyrics loading...\n[00:10.000] Welcome to AlgerMusicPlayer\n[00:15.000] This is a demo in serverless environment`
      }
    });
  } catch (error) {
    console.error('Lyric Get Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

router.post('/translate', async (req, res) => {
  try {
    const { lyric, targetLang } = req.body;

    // 模拟歌词翻译功能
    res.json({
      code: 200,
      data: {
        translatedLyric: `[00:00.000] Translated Lyrics\n[00:10.000] This is translated version`
      }
    });
  } catch (error) {
    console.error('Lyric Translate Error:', error);
    res.status(500).json({
      code: 500,
      message: error.message
    });
  }
});

module.exports = router;
