const jwt = require('jsonwebtoken');

// 認証ミドルウェア
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '認証トークンが必要です' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // トークンから取得したデータを `req.user` にセット
    next();
  } catch (error) {
    return res.status(403).json({ message: '無効なトークンです' });
  }
};

module.exports = { authenticateToken };