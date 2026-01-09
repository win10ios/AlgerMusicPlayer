# Vercel 部署指南

## 前置要求

1. 确保已安装 Node.js 18 或更高版本
2. 已安装 Vercel CLI: `npm install -g vercel`

## 构建步骤

### 1. 构建项目

```bash
npm run serverless:build
```

这将构建前端资源并复制所有必要的文件到 `dist-serverless` 目录。

### 2. 验证构建结果

确保 `dist-serverless` 目录包含以下内容：

- `index.js` - 服务器入口文件
- `api/` - 所有 API 路由
- `package.json` - 依赖配置
- `index.html` 和 `assets/` - 前端资源
- `main/`, `preload/`, `utils/` - 支持文件

## 部署到 Vercel

### 方法 1: 使用 Vercel CLI

```bash
# 登录 Vercel
vercel login

# 部署
vercel --prod
```

### 方法 2: 通过 Vercel Dashboard

1. 将项目推送到 GitHub
2. 在 Vercel Dashboard 中导入项目
3. 配置构建设置：
   - **Framework Preset**: Other
   - **Root Directory**: `./` (项目根目录)
   - **Build Command**: `npm run serverless:build`
   - **Output Directory**: `dist-serverless`

## 环境变量

在 Vercel 项目设置中配置以下环境变量（可选）：

- `NODE_ENV`: `production` (自动设置)
- `PORT`: 由 Vercel 自动设置

## 注意事项

1. **构建时间**: 完整构建可能需要 2-5 分钟
2. **函数限制**: Vercel Serverless Functions 有以下限制：
   - 最大执行时间: 60 秒
   - 最大内存: 1024 MB
3. **API 路由**: 所有 API 请求通过 `/api/*` 路径访问
4. **静态资源**: 前端资源由 Express 静态文件服务提供

## 故障排查

### 构建失败

如果构建失败，请检查：

1. Node.js 版本是否 >= 18
2. 所有依赖是否已正确安装
3. 构建路径是否正确

### 运行时错误

如果部署后遇到运行时错误：

1. 检查 Vercel 函数日志
2. 确认所有 API 路由文件都已正确复制
3. 验证依赖是否都已正确安装

### NCM API 启动问题

如果 NCM API 无法启动：

- 这是正常的，因为 serverless 环境不支持长时间运行的服务
- API 路由会通过模块加载方式工作
- 不影响应用功能

## 验证部署

部署完成后，访问以下端点验证：

- 健康检查: `https://your-domain.vercel.app/api/health`
- 主页: `https://your-domain.vercel.app/`

## 更新部署

每次更新代码后：

```bash
# 重新构建
npm run serverless:build

# 重新部署
vercel --prod
```

或通过 Vercel Dashboard 触发重新部署。
