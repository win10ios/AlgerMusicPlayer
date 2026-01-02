// serverless/preload/web-adapter.js
// Web 环境中的预加载脚本适配器

// 检测是否在 serverless/web 环境中
const isWebEnvironment = typeof window !== 'undefined' && typeof process === 'undefined';

if (isWebEnvironment) {
  // 创建一个模拟的 electron 对象
  window.electron = {
    ipcRenderer: {
      // 模拟同步 IPC 调用
      sendSync: (channel, ...args) => {
        console.log(`[WebAdapter] IPC sendSync: ${channel}`, args);

        // 根据不同的频道返回模拟数据
        switch (channel) {
          case 'get-store-value':
            const key = args[0];
            // 模拟配置数据
            if (key === 'set') {
              return {
                language: 'zh-CN',
                musicApiPort: 30488,
                theme: 'auto',
                volume: 80,
                playMode: 'listLoop',
                enableGpuAcceleration: false,
                downloadPath: '/downloads',
                proxyConfig: {
                  enable: false,
                  protocol: 'http',
                  host: '',
                  port: ''
                },
                enableRealIP: false,
                realIP: ''
              };
            } else if (key === 'shortcuts') {
              return {
                playPause: 'Space',
                next: 'Ctrl+Right',
                prev: 'Ctrl+Left',
                volumeUp: 'Ctrl+Up',
                volumeDown: 'Ctrl+Down'
              };
            }
            return null;

          case 'get-platform':
            return 'web';

          case 'get-arch':
            return 'web';

          default:
            console.warn(`[WebAdapter] Unknown sync channel: ${channel}`);
            return null;
        }
      },

      // 模拟异步 IPC 调用
      invoke: (channel, ...args) => {
        console.log(`[WebAdapter] IPC invoke: ${channel}`, args);

        return new Promise((resolve) => {
          // 根据不同的频道返回模拟数据
          switch (channel) {
            case 'select-directory':
              // 在 Web 环境中无法选择目录，返回模拟路径
              resolve('/web/downloads');
              break;

            case 'get-local-ip-addresses':
              resolve(['127.0.0.1', 'localhost']);
              break;

            case 'get-remote-control-config':
              resolve({
                enabled: false,
                port: 3000,
                password: ''
              });
              break;

            case 'check-file-exists':
              // 在 Web 环境中检查文件存在性
              resolve(false); // 假设文件不存在
              break;

            case 'get-downloaded-music':
              // 返回模拟的下载音乐列表
              resolve([]);
              break;

            case 'get-downloads-path':
              resolve('/web/downloads');
              break;

            default:
              console.warn(`[WebAdapter] Unknown async channel: ${channel}`);
              resolve(null);
          }
        });
      },

      // 模拟发送消息
      send: (channel, ...args) => {
        console.log(`[WebAdapter] IPC send: ${channel}`, args);

        // 模拟某些操作
        switch (channel) {
          case 'update-play-state':
            console.log(`[WebAdapter] Play state updated:`, args[0]);
            break;

          case 'change-language':
            console.log(`[WebAdapter] Language changed to:`, args[0]);
            break;

          case 'show-notification':
            console.log(`[WebAdapter] Notification:`, args[0]);
            // 在 Web 环境中使用 Web Notifications API
            if (Notification.permission === 'granted') {
              new Notification(args[0].title || 'Notification', {
                body: args[0].body || '',
                icon: args[0].icon || ''
              });
            }
            break;

          case 'set-store-value':
            console.log(`[WebAdapter] Store value set:`, args[0], args[1]);
            break;

          default:
            // 其他操作在 Web 环境中忽略
            break;
        }
      },

      // 模拟事件监听
      on: (channel, listener) => {
        console.log(`[WebAdapter] IPC listener registered: ${channel}`);

        // 在 Web 环境中，我们可以使用自定义事件模拟
        const handler = (event) => {
          listener(null, ...event.detail);
        };

        document.addEventListener(`electron-${channel}`, handler);
      },

      // 模拟移除事件监听
      removeListener: (channel, listener) => {
        console.log(`[WebAdapter] IPC listener removed: ${channel}`);
        // 实际实现会更复杂，这里简化处理
      },

      removeAllListeners: (channel) => {
        console.log(`[WebAdapter] All IPC listeners removed: ${channel}`);
      }
    },

    // 模拟 process 对象
    process: {
      platform: 'web',
      arch: 'web',
      version: 'v1.0.0',
      versions: {
        node: 'web',
        chrome: 'web',
        electron: 'web'
      }
    },

    // 模拟 remote 控制功能
    remoteControl: {
      sendCommand: (command, data) => {
        console.log(`[WebAdapter] Remote control command: ${command}`, data);
        // 在 Web 环境中，这可能通过 WebSocket 或其他方式实现
      }
    }
  };

  // 模拟 Node.js API
  window.require = (module) => {
    console.warn(`[WebAdapter] Node.js module requested: ${module}`);
    return null; // 在 Web 环境中不支持 Node.js 模块
  };

  // 请求通知权限
  if ('Notification' in window) {
    Notification.requestPermission();
  }

  console.log('[WebAdapter] Electron API adapter initialized for web environment');
}
