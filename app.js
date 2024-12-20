// backend/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// JSONボディパーサ
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
/// 簡易的（仮）