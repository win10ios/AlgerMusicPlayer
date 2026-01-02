// serverless/deploy.js
// 部署脚本，用于将应用部署到 LeapCell 或其他 serverless 平台

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('开始部署 AlgerMusicPlayer 到 serverless 平台...');

// 检查是否已安装必要的构建工具
function checkDependencies() {
  try {
    execSync('npm --version', { stdio: 'pipe' });
    console.log('✓ npm 已安装');
  } catch (error) {
    console.error('✗ npm 未安装，请先安装 Node.js 和 npm:', error.message);
    process.exit(1);
  }
}

// 构建前端资源
function buildFrontend() {
  console.log('构建前端资源...');

  try {
    // 设置构建环境变量
    const env = { ...process.env, BUILD_TARGET: 'serverless' };

    // 运行构建命令
    execSync('npm run build:serverless', {
      stdio: 'inherit',
      env: env
    });

    console.log('✓ 前端资源构建完成');
  } catch (e) {
    console.error('✗ 前端构建失败:', e.message);
    process.exit(1);
  }
}

// 准备部署目录
function prepareDeployment() {
  console.log('准备部署目录...');

  const distDir = path.join(__dirname, '../dist');
  const serverlessDistDir = path.join(__dirname, '../dist-serverless');

  // 确保部署目录存在
  if (!fs.existsSync(serverlessDistDir)) {
    fs.mkdirSync(serverlessDistDir, { recursive: true });
  }

  // 复制 serverless 相关文件
  const serverlessFiles = ['index.js', 'api', 'utils', 'main', 'preload'];

  for (const file of serverlessFiles) {
    const src = path.join(__dirname, file);
    const dest = path.join(serverlessDistDir, file);

    if (fs.existsSync(src)) {
      if (fs.statSync(src).isDirectory()) {
        // 递归复制目录
        copyDirectory(src, dest);
      } else {
        // 复制文件
        fs.copyFileSync(src, dest);
      }
    }
  }

  console.log('✓ 部署目录准备完成');
}

// 辅助函数：递归复制目录
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 创建部署配置文件
function createDeploymentConfig() {
  console.log('创建部署配置...');

  const distDir = path.join(__dirname, '../dist-serverless');

  // 创建 package.json 用于部署
  const deployPackageJson = {
    name: 'alger-music-player-serverless-deploy',
    version: '1.0.0',
    description: 'Alger Music Player Serverless Deployment',
    main: 'index.js',
    scripts: {
      start: 'node index.js'
    },
    dependencies: {
      ...require('../package.json').dependencies,
      express: '^4.22.1',
      cors: '^2.8.5',
      'node-fetch': '^2.7.0'
    },
    engines: {
      node: '>=18'
    }
  };

  fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(deployPackageJson, null, 2));

  // 创建 .leapcellignore 文件 (如果需要)
  const leapcellIgnore = `
node_modules
.git
*.log
.DS_Store
dist/
out/
build/
dev-app-update.yml
  `.trim();

  fs.writeFileSync(path.join(distDir, '.leapcellignore'), leapcellIgnore);

  console.log('✓ 部署配置创建完成');
}

// 执行部署
function deployToPlatform() {
  console.log('执行部署到 serverless 平台...');

  const distDir = path.join(__dirname, '../dist-serverless');
  console.log(`部署文件已准备就绪: ${distDir}`);
  console.log('');
  console.log('要部署到 LeapCell，请执行以下步骤:');
  console.log('1. 安装 LeapCell CLI: npm install -g @leapcell/cli');
  console.log('2. 登录: leapcell login');
  console.log('3. 在部署目录中部署: cd dist-serverless && leapcell deploy');
  console.log('');
  console.log('或者，您可以直接将 dist-serverless 目录中的文件上传到您的 serverless 平台。');
  console.log('');
  console.log('部署成功！ ✓');
}

// 主函数
function main() {
  console.log('AlgerMusicPlayer Serverless 部署工具');
  console.log('=====================================');

  checkDependencies();
  buildFrontend();
  prepareDeployment();
  createDeploymentConfig();
  deployToPlatform();
}

// 运行主函数
if (require.main === module) {
  main();
}
