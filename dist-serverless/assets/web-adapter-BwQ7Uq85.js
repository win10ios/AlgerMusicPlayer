const isWebEnvironment = typeof window !== "undefined" && typeof process === "undefined";
if (isWebEnvironment) {
  window.electron = {
    ipcRenderer: {
      // 模拟同步 IPC 调用
      sendSync: (channel, ...args) => {
        console.log(`[WebAdapter] IPC sendSync: ${channel}`, args);
        switch (channel) {
          case "get-store-value":
            const key = args[0];
            if (key === "set") {
              return {
                language: "zh-CN",
                musicApiPort: 30488,
                theme: "auto",
                volume: 80,
                playMode: "listLoop",
                enableGpuAcceleration: false,
                downloadPath: "/downloads",
                proxyConfig: {
                  enable: false,
                  protocol: "http",
                  host: "",
                  port: ""
                },
                enableRealIP: false,
                realIP: ""
              };
            } else if (key === "shortcuts") {
              return {
                playPause: "Space",
                next: "Ctrl+Right",
                prev: "Ctrl+Left",
                volumeUp: "Ctrl+Up",
                volumeDown: "Ctrl+Down"
              };
            }
            return null;
          case "get-platform":
            return "web";
          case "get-arch":
            return "web";
          default:
            console.warn(`[WebAdapter] Unknown sync channel: ${channel}`);
            return null;
        }
      },
      // 模拟异步 IPC 调用
      invoke: (channel, ...args) => {
        console.log(`[WebAdapter] IPC invoke: ${channel}`, args);
        return new Promise((resolve) => {
          switch (channel) {
            case "select-directory":
              resolve("/web/downloads");
              break;
            case "get-local-ip-addresses":
              resolve(["127.0.0.1", "localhost"]);
              break;
            case "get-remote-control-config":
              resolve({
                enabled: false,
                port: 3e3,
                password: ""
              });
              break;
            case "check-file-exists":
              resolve(false);
              break;
            case "get-downloaded-music":
              resolve([]);
              break;
            case "get-downloads-path":
              resolve("/web/downloads");
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
        switch (channel) {
          case "update-play-state":
            console.log(`[WebAdapter] Play state updated:`, args[0]);
            break;
          case "change-language":
            console.log(`[WebAdapter] Language changed to:`, args[0]);
            break;
          case "show-notification":
            console.log(`[WebAdapter] Notification:`, args[0]);
            if (Notification.permission === "granted") {
              new Notification(args[0].title || "Notification", {
                body: args[0].body || "",
                icon: args[0].icon || ""
              });
            }
            break;
          case "set-store-value":
            console.log(`[WebAdapter] Store value set:`, args[0], args[1]);
            break;
        }
      },
      // 模拟事件监听
      on: (channel, listener) => {
        console.log(`[WebAdapter] IPC listener registered: ${channel}`);
        const handler = (event) => {
          listener(null, ...event.detail);
        };
        document.addEventListener(`electron-${channel}`, handler);
      },
      // 模拟移除事件监听
      removeListener: (channel, listener) => {
        console.log(`[WebAdapter] IPC listener removed: ${channel}`);
      },
      removeAllListeners: (channel) => {
        console.log(`[WebAdapter] All IPC listeners removed: ${channel}`);
      }
    },
    // 模拟 process 对象
    process: {
      platform: "web",
      arch: "web",
      version: "v1.0.0",
      versions: {
        node: "web",
        chrome: "web",
        electron: "web"
      }
    },
    // 模拟 remote 控制功能
    remoteControl: {
      sendCommand: (command, data) => {
        console.log(`[WebAdapter] Remote control command: ${command}`, data);
      }
    }
  };
  window.require = (module) => {
    console.warn(`[WebAdapter] Node.js module requested: ${module}`);
    return null;
  };
  if ("Notification" in window) {
    Notification.requestPermission();
  }
  console.log("[WebAdapter] Electron API adapter initialized for web environment");
}
