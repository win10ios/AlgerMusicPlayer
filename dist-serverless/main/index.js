// serverless/main/index.js
// 适配 serverless 环境的主进程代码

// 检测运行环境
const isServerless =
  typeof process.env.AWS_LAMBDA_FUNCTION_NAME !== 'undefined' ||
  typeof process.env.VERCEL !== 'undefined' ||
  process.env.RUNTIME_ENV === 'serverless';

if (isServerless) {
  // 在 serverless 环境中，模拟 Electron 模块
  global.electron = require('../utils/electron-adapter');
  global.configStore = require('../utils/config-store');

  // 重新定义 require 以重定向 Electron 模块
  const originalRequire = require;
  global.require = function (modulePath) {
    if (modulePath === 'electron') {
      return global.electron;
    }
    if (modulePath === 'electron-store') {
      // 在 serverless 环境中使用模拟的配置存储
      return global.configStore;
    }
    return originalRequire.call(this, modulePath);
  };
}

// 导入原始的主进程逻辑（需要适配）
function initializeApp() {
  console.log('Initializing AlgerMusicPlayer in', isServerless ? 'serverless' : 'electron', 'mode');

  if (isServerless) {
    // 在 serverless 环境中的初始化逻辑
    console.log('Running in serverless mode');

    // 启动音乐 API 服务
    startMusicApi();

    // 初始化其他服务
    initLxMusicHttp();
  } else {
    // 原始的 Electron 初始化逻辑
    console.log('Running in electron mode');
    // 这里会加载原始的 Electron 应用逻辑
    require('../../src/main/index.ts');
  }
}

// 音乐 API 启动函数（serverless 适配版）
async function startMusicApi() {
  console.log('MUSIC API STARTING in serverless mode...');

  try {
    // 在 serverless 环境中，我们会通过 API 路由来提供服务
    // 这里只是模拟启动过程
    console.log('MUSIC API STARTED in serverless mode');
  } catch (error) {
    console.error('MUSIC API 启动失败:', error);
    throw error;
  }
}

// 初始化 LxMusic HTTP 处理（serverless 适配版）
function initLxMusicHttp() {
  console.log('LxMusic HTTP 初始化 in serverless mode');
  // 在 serverless 环境中，HTTP 处理会通过 API 路由完成
}

// 导出初始化函数
module.exports = { initializeApp, startMusicApi, initLxMusicHttp };

// 如果直接运行此文件，执行初始化
if (require.main === module) {
  initializeApp();
}
