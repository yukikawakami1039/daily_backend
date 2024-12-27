// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const auth = require('./src/routes/auth');
const connectDB = require('./src/config/db');

const app = express();
// JSONボディパーサ
app.use(express.json());
//authのルーティング
app.use('/auth', auth);

//データベースに接続
connectDB();

//サーバーを起動
app.listen(PORT, () => {
  console.log(`サーバーを起動中:${PORT}`);
});
