# Vercel 部署指南

## 快速部署步骤

### 方法 1: 使用 Vercel CLI（推荐）

#### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

#### 2. 登录 Vercel

```bash
vercel login
```

#### 3. 构建项目

```bash
npm run serverless:build
```

#### 4. 部署到 Vercel

```bash
vercel --prod
```

### 方法 2: 通过 Vercel Dashboard

#### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Update serverless deployment"
git push
```

#### 2. 在 Vercel Dashboard 导入项目

1. 访问 https://vercel.com/dashboard
2. 点击 "Add New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Import"

#### 3. 配置项目设置

在项目配置页面填写：

- **Framework Preset**: `Other`
- **Root Directory**: `./` (留空)
- **Build Command**: `npm run serverless:build`
- **Output Directory**: `dist-serverless`
- **Install Command**: `npm install`

#### 4. 环境变量（可选）

无需额外配置，Vercel 会自动设置：

- `NODE_ENV`: `production`
- `VERCEL`: `1`

#### 5. 部署

点击 "Deploy" 按钮

## 部署后的验证

### 1. 检查部署状态

在 Vercel Dashboard 查看部署日志

### 2. 访问应用

部署完成后，Vercel 会提供一个 URL，例如：

```
https://your-project-name.vercel.app
```

### 3. 测试 API 端点

```bash
# 健康检查
curl https://your-project-name.vercel.app/api/health

# 搜索测试
curl "https://your-project-name.vercel.app/api/search?keywords=周杰伦"
```

## 常见问题

### 1. 构建失败

**问题**: 构建过程中出现错误

**解决方案**:

- 检查 Node.js 版本是否 >= 18
- 确保 `package.json` 中的脚本正确
- 查看 Vercel 构建日志获取详细错误信息

### 2. API 返回 500 错误

**问题**: 部署后 API 调用失败

**解决方案**:

- 检查 Vercel 函数日志
- 确认所有依赖都已正确安装
- 验证 `dist-serverless` 目录包含所有必要文件

### 3. 前端无法加载

**问题**: 页面显示空白或错误

**解决方案**:

- 检查 `dist-serverless/index.html` 是否存在
- 确认静态资源路径正确
- 查看浏览器控制台错误信息

### 4. 跨域问题

**问题**: API 请求被 CORS 阻止

**解决方案**:

- 本项目已配置 CORS，应该不会出现此问题
- 如果仍有问题，检查 `serverless/index.js` 中的 CORS 配置

## 更新部署

### 使用 CLI

```bash
# 1. 构建项目
npm run serverless:build

# 2. 重新部署
vercel --prod
```

### 通过 GitHub

1. 提交代码更改
2. 推送到 GitHub
3. Vercel 会自动触发重新部署

## 自定义域名

### 1. 在 Vercel Dashboard

1. 进入项目设置
2. 点击 "Domains"
3. 添加自定义域名

### 2. 配置 DNS

按照 Vercel 提供的 DNS 记录配置你的域名提供商

## 性能优化

### 1. 启用缓存

在 `vercel.json` 中已配置：

- 静态资源自动缓存
- API 响应缓存策略

### 2. 监控性能

在 Vercel Dashboard 查看：

- 函数执行时间
- 请求成功率
- 错误日志

## 成本估算

Vercel 免费套餐包含：

- 100GB 带宽/月
- 无限部署
- 6,000 分钟执行时间/月

超出后按使用量付费。

## 技术支持

如遇到问题：

1. 查看 Vercel 文档: https://vercel.com/docs
2. 检查项目日志
3. 联系 Vercel 支持

## 快速参考

### 部署命令

```bash
# 完整部署流程
npm run serverless:build
vercel --prod
```

### 验证命令

```bash
# 健康检查
curl https://your-domain.vercel.app/api/health

# 测试搜索
curl "https://your-domain.vercel.app/api/search?keywords=test"
```

### 更新命令

```bash
# 更新并重新部署
npm run serverless:build
vercel --prod
```
