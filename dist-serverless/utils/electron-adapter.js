// serverless/utils/electron-adapter.js
// Electron API 适配器，用于在 serverless 环境中模拟 Electron 功能

class ElectronAdapter {
  constructor() {
    this.ipcMain = {
      handle: (channel, listener) => {
        // 在 serverless 环境中模拟 IPC 处理
        console.log(`[ElectronAdapter] IPC handler registered for: ${channel}`);
      },
      on: (channel, listener) => {
        // 在 serverless 环境中模拟 IPC 事件监听
        console.log(`[ElectronAdapter] IPC listener registered for: ${channel}`);
      }
    };

    this.app = {
      getName: () => 'AlgerMusicPlayer-Serverless',
      getVersion: () => '5.0.0-serverless',
      getPath: (name) => {
        // 在 serverless 环境中返回适当的路径
        switch (name) {
          case 'userData':
            return '/tmp/alger-music-player';
          case 'home':
            return '/tmp';
          default:
            return '/tmp';
        }
      },
      getLocale: () => 'zh-CN',
      on: (event, callback) => {
        console.log(`[ElectronAdapter] App event listener for: ${event}`);
      },
      quit: () => {
        console.log('[ElectronAdapter] App quit (simulated)');
      }
    };

    this.BrowserWindow = class {
      constructor(options) {
        this.options = options;
        this.webContents = {
          send: (channel, ...args) => {
            console.log(`[ElectronAdapter] Send to webContents: ${channel}`, args);
          }
        };
        console.log('[ElectronAdapter] BrowserWindow created (simulated)');
      }

      loadURL(url) {
        console.log(`[ElectronAdapter] Load URL: ${url}`);
      }

      show() {
        console.log('[ElectronAdapter] Window show (simulated)');
      }

      focus() {
        console.log('[ElectronAdapter] Window focus (simulated)');
      }
    };

    this.nativeImage = {
      createFromPath: (path) => {
        console.log(`[ElectronAdapter] Create image from path: ${path}`);
        return { path };
      }
    };
  }

  // 获取适配器实例
  static getInstance() {
    if (!global.electronAdapterInstance) {
      global.electronAdapterInstance = new ElectronAdapter();
    }
    return global.electronAdapterInstance;
  }
}

module.exports = ElectronAdapter.getInstance();
