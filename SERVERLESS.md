# AlgerMusicPlayer - Serverless 部署指南

本项目已成功适配 serverless 环境，可以在 LeapCell 或其他 serverless 平台上运行。

## 概述

AlgerMusicPlayer 是一个功能丰富的音乐播放器，支持在线播放、歌词显示、音乐下载等功能。通过本次改造，该项目现在可以在 serverless 环境中运行，无需传统的服务器部署。

## 架构变化

### 1. 服务端改造

- 创建了 `serverless/` 目录，包含所有 serverless 适配代码
- 实现了 Express.js 服务器，提供 API 端点
- 适配了网易云音乐 API 接口
- 创建了模拟 Electron 功能的适配器

### 2. 客户端改造

- 创建了 Web 环境适配器 (`serverless/preload/web-adapter.js`)
- 修改了渲染进程入口，使其在 Web 环境中加载适配器
- 适配了 IPC 通信机制，使用 API 调用替代 Electron IPC

### 3. API 端点

- `/api/music` - 音乐播放相关功能
- `/api/search` - 搜索功能
- `/api/lyric` - 歌词功能
- `/api/user` - 用户功能
- `/api/playlist` - 播放列表功能
- `/api/artist` - 艺术家功能
- `/api/album` - 专辑功能
- `/api/lx-music` - HTTP 请求处理
- `/api/health` - 健康检查端点

## 部署到 LeapCell

### 方法 1: 使用部署脚本

1. 构建前端资源：

```bash
npm run serverless:build
```

2. 运行部署脚本：

```bash
npm run serverless:deploy
```

3. 按照提示部署到 LeapCell：

```bash
# 安装 LeapCell CLI
npm install -g @leapcell/cli

# 登录
leapcell login

# 部署
cd dist-serverless && leapcell deploy
```

### 方法 2: 手动部署

1. 构建项目：

```bash
npm run serverless:build
```

2. 将 `dist-serverless` 目录中的文件上传到 LeapCell 平台

### 环境变量配置

在 LeapCell 中设置以下环境变量（如需要）：

- `PORT` - 服务端口（默认 3000）
- `API_TARGET` - 后端 API 目标地址
- `DEFAULT_LANGUAGE` - 默认语言
- `DEFAULT_THEME` - 默认主题

## 功能特性

- ✅ 音乐播放和控制
- ✅ 歌词显示
- ✅ 音乐搜索
- ✅ 播放列表管理
- ✅ 用户账户功能
- ✅ MV 播放
- ✅ 音乐下载（在支持的环境中）
- ✅ 多语言支持
- ✅ 主题切换

## 限制说明

由于 serverless 环境的限制：

- 某些需要本地文件系统操作的功能可能受限
- 长时间运行的音乐播放依赖客户端实现
- 桌面通知功能使用 Web Notifications API
- 系统集成功能（如托盘图标）不可用

## 开发

在本地开发 serverless 版本：

```bash
# 启动 serverless 开发服务器
npm run serverless:dev

# 运行测试
node serverless/test.js
```

## 技术栈

- **服务端**: Node.js, Express.js
- **前端**: Vue 3, TypeScript
- **构建工具**: Vite
- **UI 框架**: Naive UI
- **API**: 兼容网易云音乐 API

## 支持

如有问题，请参考原项目文档或提交 issue。

原项目地址: https://github.com/algerkong/AlgerMusicPlayer
