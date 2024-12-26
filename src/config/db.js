//データベースに接続
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// 環境変数の読み込み
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDBに接続しました');
    } catch (err) {
        console.error('MongoDB接続エラー:', err.message);
    }
};

module.exports = connectDB;
