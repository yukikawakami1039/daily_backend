const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//ユーザー新規登録用API
exports.register = async (req, res) => {
        try {
            const { userName, email, password } = req.body;

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
};

//ログイン用API
exports.login = async (req, res) => { 
    try {
        const { email, password } = req.body;

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
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'サーバーエラー' });
    }
};



//DBのユーザーを確認
exports.allUsers = async (req, res) => {
    const users = await User.find({},{password:0});
    try {
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'サーバーエラー' });
    }
};


