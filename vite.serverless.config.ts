import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import VueDevTools from 'vite-plugin-vue-devtools';

// 检查是否在 serverless 构建模式下
const isServerlessBuild = process.env.BUILD_TARGET === 'serverless';

export default defineConfig({
  base: isServerlessBuild ? '/' : './',
  // 如果是 serverless 构建，则使用标准的前端构建配置
  root: resolve('src/renderer'),
  resolve: {
    alias: {
      '@': resolve('src/renderer'),
      '@renderer': resolve('src/renderer'),
      '@i18n': resolve('src/i18n'),
      '@preload': resolve('../serverless/preload') // 修复预加载路径别名
    }
  },
  plugins: [
    vue(),
    isServerlessBuild ? null : viteCompression(), // serverless 环境可能不需要压缩
    isServerlessBuild ? null : VueDevTools(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ].filter(Boolean), // 过滤掉 null 值
  publicDir: resolve('../resources'),
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: isServerlessBuild
      ? {
          // 为 serverless 环境配置代理以访问后端 API
          '/api': {
            target: process.env.API_TARGET || 'http://localhost:30488',
            changeOrigin: true,
            secure: false
          }
        }
      : {}
  },
  build: {
    outDir: isServerlessBuild ? '../../dist' : '../out/renderer', // 修复输出路径
    assetsDir: 'assets',
    minify: 'terser', // 使用 terser 以获得更好的压缩效果
    rollupOptions: {
      output: {
        manualChunks: {
          // 分割包以优化加载
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['naive-ui'],
          utils: ['axios', 'lodash']
        }
      }
    }
  },
  define: {
    // 定义全局常量以区分构建环境
    'process.env.BUILD_TARGET': JSON.stringify(process.env.BUILD_TARGET || 'electron')
  }
});
