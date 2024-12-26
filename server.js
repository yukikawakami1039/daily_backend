// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const auth = require('./src/routes/auth');
const connectDB = require('./src/config/db');

// JSONボディパーサ
app.use(express.json());
//authのルーティング
app.use('/auth', auth);

//
app.get('/', (req, res) => {
  res.send('Backend server is running');
});
//データベースに接続
connectDB();

//サーバーを起動
app.listen(PORT, () => {
  console.log(`サーバーを起動中:${PORT}`);
});
