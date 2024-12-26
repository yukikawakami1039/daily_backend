const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const User = require('../models/User');


router.post('/create', async (req, res) => {
  try {
    const { userId, isHoliday, issues, reports, tomorrow } = req.body;
    
    // userIdに基づいてユーザーをデータベースから検索します。
    const user = await User.findById(userId);
    // ユーザーが見つからなかった場合は、404エラーを返します。
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
    // ユーザー名を取得します。
    const username = user.username;
    // 今日の日付を取得します。
    const today = new Date();

    // ユーザーIDと今日の日付を基に、既存の日報をデータベースから検索します。
    const existingReport = await Report.findOne({ userId: userId, day: today });

    // 既存の日報が存在する場合,日報を更新します。
    if (existingReport) {

      existingReport.isHoliday = isHoliday;
      existingReport.issues = issues;
      existingReport.reports = reports;
      existingReport.tomorrow = tomorrow;

      // 更新された日報をデータベースに保存します。
      await existingReport.save();

      // 200ステータスコードと、更新成功のメッセージ、更新された日報データを返します。
      return res.status(200).json({ message: '日報を更新しました', data: existingReport });
    } else {

      // 新しい日報のインスタンスを作成します。
      const newReport = new Report({
        userId,
        username,
        day: today,
        isHoliday,
        issues,
        reports,
        tomorrow,
      });
      
        // 新しい日報をデータベースに保存します。
        await newReport.save();
        // 201ステータスコードと、作成成功のメッセージ、作成された日報データを返します。
        return res.status(201).json({ message: '日報を作成しました', data: newReport });
    }
  } catch (error) {
    // エラーが発生した場合、500ステータスコードとエラーメッセージを返します。
    res.status(500).json({ message: '日報の保存に失敗しました', error: error.message });
  }
});

module.exports = router;