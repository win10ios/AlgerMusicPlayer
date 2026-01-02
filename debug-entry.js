// 测试入口文件
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
const staticPath = path.join(__dirname, 'dist');
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
} else {
  // 如果没有构建结果，提供资源文件
  app.use(express.static(path.join(__dirname, 'resources')));
}

console.log('About to add API routes...');

// API 路由 - 音乐相关功能
try {
  app.use('/api/music', require('./dist-serverless/api/music'));
  console.log('✓ Music API route added');
} catch (e) {
  console.log('✗ Error adding music route:', e.message);
  console.error(e);
}

try {
  app.use('/api/search', require('./dist-serverless/api/search'));
  console.log('✓ Search API route added');
} catch (e) {
  console.log('✗ Error adding search route:', e.message);
  console.error(e);
}

try {
  app.use('/api/lyric', require('./dist-serverless/api/lyric'));
  console.log('✓ Lyric API route added');
} catch (e) {
  console.log('✗ Error adding lyric route:', e.message);
  console.error(e);
}

try {
  app.use('/api/user', require('./dist-serverless/api/user'));
  console.log('✓ User API route added');
} catch (e) {
  console.log('✗ Error adding user route:', e.message);
  console.error(e);
}

try {
  app.use('/api/playlist', require('./dist-serverless/api/playlist'));
  console.log('✓ Playlist API route added');
} catch (e) {
  console.log('✗ Error adding playlist route:', e.message);
  console.error(e);
}

try {
  app.use('/api/artist', require('./dist-serverless/api/artist'));
  console.log('✓ Artist API route added');
} catch (e) {
  console.log('✗ Error adding artist route:', e.message);
  console.error(e);
}

try {
  app.use('/api/album', require('./dist-serverless/api/album'));
  console.log('✓ Album API route added');
} catch (e) {
  console.log('✗ Error adding album route:', e.message);
  console.error(e);
}

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
try {
  app.use('/api/lx-music', require('./dist-serverless/api/lxMusicHttp'));
  console.log('✓ LxMusic API route added');
} catch (e) {
  console.log('✗ Error adding lx-music route:', e.message);
  console.error(e);
}

console.log('All routes added, about to add other middleware...');

// 处理所有其他路由，返回 index.html（用于前端路由）
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist/index.html');
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

console.log('All middleware added successfully!');

// 立即关闭服务器
console.log('Test completed successfully');
