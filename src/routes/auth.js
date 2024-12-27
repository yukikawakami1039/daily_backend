//authのルーティング
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const { authenticateToken } = require('../middlewares/auth');
//ログイン
router.get('/auth', (req, res) => {
  res.send('auth');
});

//ユーザー新規登録用API
router.post('/register', 
    body('userName').notEmpty(),
    body('email').isEmail(), 
    body('password').isLength({ min: 6 }), 
    async (req, res) => {
        try {
            const userName = req.body.userName;
            const email = req.body.email;
            const password = req.body.password;
            //バリデーション
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //ユーザーが存在するか確認
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json([
                {
                    message: 'すでにそのユーザーが存在しています'
                }
            ]);
        }
        //パスワードをハッシュ化
        let hashedPassword = await bcrypt.hash(password, 10);

        //dbに保存
        const newUser = await User.create({ userName, email, password: hashedPassword });
        await newUser.save();

        //JWTを発行
        const token = jwt.sign({ id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
        );

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'サーバーエラー' });
    }
});

//ログイン用API
router.post('/login', async (req, res) => { 
    try {
        const email = req.body.email;
        const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json([{ message: 'ユーザーが存在しません' }]);
    }

    //パスワードの複合、照合
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json([{ message: 'パスワードが間違っています' }]);
    }

    //JWTを発行
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'サーバーエラー' });
    }
});



//DBのユーザーを確認
router.get("/allUsers", authenticateToken, async (req, res) => {
    const users = await User.find({},{password:0});
    try {
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'サーバーエラー' });
    }
});

//得たユーザー情報をもとに日記の記入等進める


//ユーザーのデータを更新(frontendから送信されたデータを更新)
router.put("/updateUser", authenticateToken, async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
});
module.exports = router;