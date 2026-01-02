// serverless/utils/config-store.js
// 配置存储适配器，用于在 serverless 环境中替代 electron-store

class ConfigStore {
  constructor() {
    // 在 serverless 环境中使用内存存储或环境变量
    this.store = {
      // 默认配置
      set: {
        language: process.env.DEFAULT_LANGUAGE || 'zh-CN',
        enableGpuAcceleration: false,
        musicApiPort: process.env.MUSIC_API_PORT || 30488,
        theme: process.env.DEFAULT_THEME || 'auto',
        volume: process.env.DEFAULT_VOLUME || 80,
        playMode: process.env.DEFAULT_PLAY_MODE || 'listLoop',
        equalizer: {
          enabled: false,
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      }
    };
  }

  get(key, defaultValue = null) {
    // 支持嵌套键访问，如 'set.language'
    const keys = key.split('.');
    let value = this.store;

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    return value !== undefined ? value : defaultValue;
  }

  set(key, value) {
    // 支持嵌套键设置
    const keys = key.split('.');
    let target = this.store;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!target[k] || typeof target[k] !== 'object') {
        target[k] = {};
      }
      target = target[k];
    }

    target[keys[keys.length - 1]] = value;

    // 在 serverless 环境中，配置不会持久化，这里仅作记录
    console.log(`[ConfigStore] Set ${key} =`, value);
  }

  has(key) {
    try {
      return this.get(key) !== undefined;
    } catch {
      return false;
    }
  }

  delete(key) {
    const keys = key.split('.');
    let target = this.store;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!target[k] || typeof target[k] !== 'object') {
        return;
      }
      target = target[k];
    }

    delete target[keys[keys.length - 1]];
  }
}

// 创建全局实例
const configStore = new ConfigStore();

module.exports = configStore;
