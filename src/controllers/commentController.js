const User = require('../models/User');
const comment = require('../models/comment');

// コメントを作成または更新する
exports.commentCreate = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    // 認証ミドルウェアから userId を取得
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    const username = user.username;
    const today = new Date();

    // 同じユーザーが同じ投稿に対してコメントしているか確認
    const existingComment = await Comment.findOne({ userId, postId });

    if (existingComment) {
      // コメントを更新
      existingComment.content = content;

      await existingComment.save();

      return res.status(200).json({ message: 'コメントを更新しました', data: existingComment });
    } else {
      // 新しいコメントを作成
      const newComment = new Comment({
        userId,
        username,
        text,
        createdAt: today,
      });

      await newComment.save();

      return res.status(201).json({ message: 'コメントを作成しました', data: newComment });
    }
  } catch (error) {
    res.status(500).json({ message: 'コメントの保存に失敗しました', error: error.message });
  }
};
