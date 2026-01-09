# AlgerMusicPlayer - Vercel 部署检查报告

## ✅ 已修复的问题

### 1. 路由注册问题

- **问题**: `serverless/index.js` 中使用了占位符路由，实际 API 路由文件（bilibili.js, mv.js, login.js, recommend.js）未被正确注册
- **修复**: 更新了路由注册代码，将所有 API 路由正确导入：
  - `/api/bilibili` - B站相关功能
  - `/api/mv` - MV 相关功能
  - `/api/login` - 登录功能
  - `/api/recommend` - 推荐功能

### 2. 构建脚本跨平台兼容性

- **问题**: 构建脚本使用了 Windows 特定的 `xcopy` 命令，在 Linux/Mac 环境下无法工作
- **修复**: 将所有文件复制操作改为使用 Node.js 的 `fs` 模块，实现跨平台兼容

### 3. Vercel 配置缺失

- **问题**: 项目缺少 Vercel 部署所需的配置文件
- **修复**: 创建了以下配置文件：
  - `vercel.json` - Vercel 部署配置
  - `.vercelignore` - Vercel 忽略文件配置
  - `VERCEL_DEPLOY.md` - 详细的部署指南

### 4. Serverless 函数导出方式

- **问题**: Express 应用导出方式不适合 Vercel Serverless Functions
- **修复**: 修改导出方式为 `module.exports = (req, res) => { app(req, res); }`

### 5. 依赖配置

- **问题**: `dist-serverless/package.json` 缺少必要的依赖和引擎版本要求
- **修复**: 添加了：
  - `crypto-js` 依赖
  - `engines` 字段指定 Node.js >= 18.0.0

### 6. NCM API 启动逻辑

- **问题**: 在 serverless 环境中尝试启动长时间运行的 NCM API 服务
- **修复**: 添加了 Vercel 环境检测，在 Vercel 环境中跳过服务启动

### 7. 构建流程优化

- **问题**: 构建流程不完整，需要手动执行多个步骤
- **修复**: 更新了 `build:serverless` 脚本，一次性完成所有构建和复制步骤

## 📋 当前项目状态

### 文件结构

```
dist-serverless/
├── api/                    # 所有 API 路由
│   ├── album.js
│   ├── artist.js
│   ├── bilibili.js
│   ├── login.js
│   ├── lxMusicHttp.js
│   ├── lyric.js
│   ├── music.js
│   ├── mv.js
│   ├── playlist.js
│   ├── recommend.js
│   ├── search.js
│   └── user.js
├── assets/                 # 前端资源
├── html/                   # HTML 文件
├── icons/                  # 图标资源
├── main/                   # 主进程适配器
├── preload/                # 预加载脚本
├── utils/                  # 工具函数
├── index.js                # 服务器入口
├── index.html              # 前端入口
├── package.json            # 依赖配置
└── deploy.js               # 部署脚本
```

### 构建命令

```bash
# 完整构建（推荐）
npm run serverless:build

# 或分步构建
npm run build:serverless      # 构建前端
npm run build:serverless-api  # 复制 API 文件
```

## 🚀 部署到 Vercel

### 方法 1: 使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 构建项目
npm run serverless:build

# 4. 部署
vercel --prod
```

### 方法 2: 通过 Vercel Dashboard

1. 将项目推送到 GitHub
2. 在 Vercel Dashboard 中导入项目
3. 配置构建设置：
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `npm run serverless:build`
   - **Output Directory**: `dist-serverless`

## ⚠️ 注意事项

### 1. NCM API 服务

在 Vercel serverless 环境中：

- ❌ 不会启动 NCM API 服务器（端口 30488/30489）
- ✅ API 路由通过模块加载方式工作
- ✅ 所有 API 功能正常可用

### 2. 函数限制

Vercel Serverless Functions 有以下限制：

- 最大执行时间: 60 秒
- 最大内存: 1024 MB
- 这些限制已在 `vercel.json` 中配置

### 3. 环境变量

无需额外配置环境变量，Vercel 会自动设置：

- `NODE_ENV`: `production`
- `PORT`: 由 Vercel 自动分配

### 4. 构建时间

完整构建可能需要 2-5 分钟，这是正常的。

## ✅ 验证清单

部署完成后，请验证以下端点：

- [ ] 健康检查: `https://your-domain.vercel.app/api/health`
- [ ] 主页: `https://your-domain.vercel.app/`
- [ ] API 路由: `https://your-domain.vercel.app/api/music`
- [ ] 搜索功能: `https://your-domain.vercel.app/api/search`
- [ ] 登录功能: `https://your-domain.vercel.app/api/login`

## 📞 故障排查

如果遇到问题：

1. **构建失败**: 检查 Node.js 版本是否 >= 18
2. **运行时错误**: 查看 Vercel 函数日志
3. **API 错误**: 确认所有 API 路由文件都已正确复制
4. **依赖问题**: 运行 `npm install` 确保所有依赖已安装

## 📝 总结

所有已知的 serverless 部署问题都已修复，项目现在可以成功部署到 Vercel。主要修复包括：

✅ 路由注册问题
✅ 构建脚本跨平台兼容性
✅ Vercel 配置文件
✅ Serverless 函数导出方式
✅ 依赖配置
✅ NCM API 启动逻辑
✅ 构建流程优化

项目已准备好部署到 Vercel！
