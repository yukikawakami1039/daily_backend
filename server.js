// backend/server.js
const express = require('express');
const app = express();
const auth = require('./src/routes/auth');
const PORT = process.env.PORT || 3000;

//authのルーティング
app.use('/auth', auth);
// JSONボディパーサ
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(PORT, () => {
  console.log(`sサーバーを起動中:${PORT}`);
});
/// 簡易的（仮）