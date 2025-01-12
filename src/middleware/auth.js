const jwt = require('jsonwebtoken');

// 認証ミドルウェア
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '認証トークンが必要です' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("authenticateToken: Decoded JWT:", decoded); // デコードされたトークンを出力

    // デコードされたトークンにIDが含まれているか確認
    if (!decoded.id) {
        console.error("authenticateToken: JWT does not contain user ID");
        return res.status(403).json({ message: '無効なトークンです。IDが含まれていません' });
    }
    
    req.user = decoded; // デコードされたトークンを `req.user` に設定
    next();
  } catch (error) {
    console.error("authenticateToken: JWT verification error:", error);
    return res.status(403).json({ message: '無効なトークンです' });
  }
};

module.exports = { authenticateToken };