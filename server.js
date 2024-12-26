// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const auth = require('./src/routes/auth');
const report = require('./src/routes/report');


// JSONボディパーサ
app.use(express.json());
//authのルーティング
app.use('/auth', auth);
//reportのルーティング
app.use('/report', report);

//
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

//データベースに接続
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`サーバーを起動中:${PORT}`);
});
