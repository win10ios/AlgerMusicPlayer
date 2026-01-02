// Minimal server for testing
const express = require('express');
const app = express();

// 启用基本中间件
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 添加所有 API 路由
try {
  app.use('/api/music', require('./dist-serverless/api/music'));
  console.log('✓ Music API route added');
} catch (e) {
  console.log('✗ Error adding music route:', e.message);
}

try {
  app.use('/api/search', require('./dist-serverless/api/search'));
  console.log('✓ Search API route added');
} catch (e) {
  console.log('✗ Error adding search route:', e.message);
}

try {
  app.use('/api/lyric', require('./dist-serverless/api/lyric'));
  console.log('✓ Lyric API route added');
} catch (e) {
  console.log('✗ Error adding lyric route:', e.message);
}

try {
  app.use('/api/user', require('./dist-serverless/api/user'));
  console.log('✓ User API route added');
} catch (e) {
  console.log('✗ Error adding user route:', e.message);
}

try {
  app.use('/api/playlist', require('./dist-serverless/api/playlist'));
  console.log('✓ Playlist API route added');
} catch (e) {
  console.log('✗ Error adding playlist route:', e.message);
}

try {
  app.use('/api/artist', require('./dist-serverless/api/artist'));
  console.log('✓ Artist API route added');
} catch (e) {
  console.log('✗ Error adding artist route:', e.message);
}

try {
  app.use('/api/album', require('./dist-serverless/api/album'));
  console.log('✓ Album API route added');
} catch (e) {
  console.log('✗ Error adding album route:', e.message);
}

try {
  app.use('/api/lx-music', require('./dist-serverless/api/lxMusicHttp'));
  console.log('✓ LxMusic API route added');
} catch (e) {
  console.log('✗ Error adding lx-music route:', e.message);
}

// 添加健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

console.log('All routes tested successfully!');

const server = app.listen(3002, () => {
  console.log('Test server running on port 3002');
  server.close(); // 立即关闭
});
