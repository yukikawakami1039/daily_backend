//authのルーティング
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
//ログイン
router.get('/', (req, res) => {
  res.send('auth');
});

//ユーザー新規登録用API
router.post('/register', 
    body('userName').notEmpty(),
    body('email').isEmail(), 
    body('password').isLength({ min: 6 }), 
    async (req, res) => {
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        //バリデーション
        const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //ユーザーが存在するか確認
    const user = User.find((user) => user.email === email);
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
    User.push({ userName, email, password: hashedPassword });
    //res.status(201).json({ message: 'ユーザー登録が完了しました' });

    //JWTを発行
    const token = jwt.sign({ email, },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
    );

    return res.status(200).json({ token });
});

//ログイン用API
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = User.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json([{ message: 'ユーザーが存在しません' }]);
    }

    //パスワードを比較
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json([{ message: 'パスワードが間違っています' }]);
    }

    //JWTを発行
    const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ token });
});



//DBのユーザーを確認
router.get("/allUsers", (req, res) => {
    return res.json(User);
});

//得たユーザー情報をもとに日記の記入等進める


//ユーザーのデータを更新(frontendから送信されたデータを更新)
router.put("/updateUser", (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
});
module.exports = router;