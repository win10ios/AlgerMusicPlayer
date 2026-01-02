const express = require('express');
const app = express();

// 测试单个路由来找出问题
console.log('Testing route addition...');

try {
  app.use('/api/music', require('./dist-serverless/api/music'));
  console.log('Music route added successfully');
} catch (e) {
  console.log('Error adding music route:', e.message);
  console.error(e);
}

try {
  app.use('/api/album', require('./dist-serverless/api/album'));
  console.log('Album route added successfully');
} catch (e) {
  console.log('Error adding album route:', e.message);
  console.error(e);
}

console.log('All routes added successfully');

// 仅启动服务器用于测试
const server = app.listen(3001, () => {
  console.log('Test server running on port 3001');
  server.close(); // 立即关闭服务器
});
