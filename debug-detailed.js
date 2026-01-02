// 带调试信息的入口文件
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');

// 创建临时目录和文件以避免错误
const tempDir = path.resolve(os.tmpdir());
const tokenPath = path.resolve(tempDir, 'anonymous_token');

if (!fs.existsSync(tokenPath)) {
  try {
    fs.writeFileSync(tokenPath, '', 'utf-8');
    console.log('Created anonymous_token file');
  } catch (err) {
    console.warn('Could not create anonymous_token file:', err.message);
  }
}

// 创建 Express 应用
const app = express();

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 静态文件服务 - 提供构建后的前端文件
const staticPath = path.join(__dirname, '../dist');
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
} else {
  // 如果没有构建结果，提供资源文件
  app.use(express.static(path.join(__dirname, '../resources')));
}

// 调试：在使用每个路由前检查
console.log('Current working directory:', __dirname);
console.log('About to add API routes...');

// API 路由 - 音乐相关功能
const musicRouter = require('./api/music');
console.log('Music router type:', typeof musicRouter);
app.use('/api/music', musicRouter);

const searchRouter = require('./api/search');
console.log('Search router type:', typeof searchRouter);
app.use('/api/search', searchRouter);

const lyricRouter = require('./api/lyric');
console.log('Lyric router type:', typeof lyricRouter);
app.use('/api/lyric', lyricRouter);

const userRouter = require('./api/user');
console.log('User router type:', typeof userRouter);
app.use('/api/user', userRouter);

const playlistRouter = require('./api/playlist');
console.log('Playlist router type:', typeof playlistRouter);
app.use('/api/playlist', playlistRouter);

const artistRouter = require('./api/artist');
console.log('Artist router type:', typeof artistRouter);
app.use('/api/artist', artistRouter);

const albumRouter = require('./api/album');
console.log('Album router type:', typeof albumRouter);
app.use('/api/album', albumRouter);

// 为缺失的路由创建占位符
const createPlaceholderRouter = (name) => {
  const router = require('express').Router();
  router.all('*', (req, res) => {
    console.log(`[Placeholder] ${name} API called:`, req.method, req.path);
    res.json({
      code: 200,
      message: `${name} API is running in serverless mode`,
      path: req.path
    });
  });
  return router;
};

app.use('/api/mv', createPlaceholderRouter('MV'));

// 其他 API 路由
const lxMusicRouter = require('./api/lxMusicHttp');
console.log('LxMusic router type:', typeof lxMusicRouter);
app.use('/api/lx-music', lxMusicRouter);

// 处理所有其他路由，返回 index.html（用于前端路由）
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // 如果没有找到构建文件，返回一个错误页面
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>AlgerMusicPlayer - Serverless</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .container { max-width: 600px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>AlgerMusicPlayer Serverless</h1>
            <p>应用尚未构建。请先运行构建命令。</p>
            <p>当前在 serverless 模式下运行。</p>
            <div id="status">Server is running...</div>
            <script>
              // 简单的健康检查
              fetch('/api/health').then(res => res.json()).then(data => {
                document.getElementById('status').textContent = 'Server status: ' + data.status;
              }).catch(err => {
                console.error('Health check failed:', err);
              });
            </script>
          </div>
        </body>
      </html>
    `);
  }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'serverless',
    version: '1.0.0'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 如果直接运行此文件（非 serverless 环境），启动服务器
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`AlgerMusicPlayer serverless app listening at http://0.0.0.0:${port}`);
  });
}

console.log('Index.js loaded successfully');
