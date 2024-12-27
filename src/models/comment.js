const mongoose = require('mongoose');
const { Schema } = mongoose;

// コメントスキーマ定義
const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ユーザーID
  userName: { type: String, required: true }, // ユーザー名
  text: { type: String, required: true }, // コメント内容
  createdAt: { type: Date, default: Date.now } // 作成日時
});


const comment = mongoose.model('Comment', commentSchema);

module.exports = { comment };