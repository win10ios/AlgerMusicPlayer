const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 托管打包后的前端
app.use(express.static(path.join(__dirname, 'dist')));

// 处理 SPA 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Web app running on port ${PORT}`);
});
