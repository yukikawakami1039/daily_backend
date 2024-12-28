//authのルーティング
const router = require('express').Router();
const { body } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const { authenticateToken } = require('../middleware/auth');
const authController = require('../controllers/authController');
//ログイン(test)
router.get('/auth', (req, res) => {
  res.send('auth');
});

//ユーザー新規登録
router.post('/register', 
    [    body('userName').notEmpty(),
        body('email').isEmail(), 
        body('password').isLength({ min: 6 }), 
    ],
    authController.register
);

//ログイン
router.post('/login', authController.login);

//ユーザー一覧取得
router.get('/allUsers', authenticateToken, authController.allUsers);

//ユーザーのデータを更新(frontendから送信されたデータを更新)
//router.put("/updateUser", authenticateToken, authController.updateUser);

module.exports = router;