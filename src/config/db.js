const mongoose = require('mongoose');
const dotenv = require('dotenv');
// 環境変数の読み込み
dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error(
        'MongoDB接続エラー: 環境変数 MONGO_URI が設定されていません'
      );
      process.exit(1); // プロセスを終了
    }
    console.log(`MongoDB URI: ${mongoUri}`); // どのURIを使用しているかログ出力

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDBに接続しました');
  } catch (err) {
    console.error('MongoDB接続エラー:', err.message);
    process.exit(1); // プロセスを終了
  }
};

module.exports = connectDB;
