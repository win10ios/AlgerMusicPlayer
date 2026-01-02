// serverless/test.js
// 简单的测试脚本，用于验证 serverless 应用是否正常工作

const request = require('supertest');
const app = require('./index');

console.log('开始测试 AlgerMusicPlayer serverless 应用...');

// 测试健康检查端点
async function testHealthEndpoint() {
  console.log('测试健康检查端点...');

  return new Promise((resolve, reject) => {
    request(app)
      .get('/api/health')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error('健康检查端点测试失败:', err);
          reject(err);
        } else {
          console.log('✓ 健康检查端点测试通过:', res.body);
          resolve(res.body);
        }
      });
  });
}

// 测试音乐 API 端点
async function testMusicEndpoint() {
  console.log('测试音乐 API 端点...');

  return new Promise((resolve, reject) => {
    request(app)
      .get('/api/music/ncm-proxy')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error('音乐 API 端点测试失败:', err);
          reject(err);
        } else {
          console.log('✓ 音乐 API 端点测试通过:', res.body);
          resolve(res.body);
        }
      });
  });
}

// 测试搜索 API 端点
async function testSearchEndpoint() {
  console.log('测试搜索 API 端点...');

  return new Promise((resolve, reject) => {
    request(app)
      .get('/api/search/suggest?keywords=test')
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error('搜索 API 端点测试失败:', err);
          reject(err);
        } else {
          console.log('✓ 搜索 API 端点测试通过:', res.body);
          resolve(res.body);
        }
      });
  });
}

// 运行所有测试
async function runTests() {
  try {
    await testHealthEndpoint();
    await testMusicEndpoint();
    await testSearchEndpoint();

    console.log('\n✓ 所有测试通过！Serverless 应用已准备好部署到 LeapCell。');
    console.log('\n部署说明：');
    console.log('1. 运行 `npm run serverless:build` 构建前端资源');
    console.log('2. 运行 `npm run serverless:deploy` 部署到 serverless 平台');
    console.log('3. 或者直接将 serverless 目录中的文件上传到您的 serverless 平台');
  } catch (error) {
    console.error('\n✗ 测试失败:', error.message);
    process.exit(1);
  }
}

// 运行测试
if (require.main === module) {
  runTests();
}
