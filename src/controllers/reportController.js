const Report = require('../models/report');
const { User } = require('../models/User');
// 日報の作成または更新
exports.reportCreate = async (req, res) => {
    try {
        const { userId, isHoliday, issues, reports, tomorrow } = req.body;

        // 認証ミドルウェアから userId を取得
       const userIdFromToken = req.user.id;
      if (!userIdFromToken){
        return res.status(404).json({message:"認証トークンにユーザーIDが含まれていません"});
      }


     let user;
       try{
       user =  await User.findById(userIdFromToken)

     } catch(error){
        return res.status(404).json({message:"ユーザーが見つかりませんでした"});
     }

        if(!user) {
          return res.status(404).json({message: 'ユーザーが見つかりません'});
      }

      const username = user.userName;
         const today = new Date();

        // 既存の日報を検索
    const existingReport = await Report.findOne({ userId: userId, day: today });

      if (existingReport) {
        // 日報の更新
       existingReport.isHoliday = isHoliday;
      existingReport.issues = issues;
     existingReport.reports = reports;
    existingReport.tomorrow = tomorrow;

        await existingReport.save();
    
        return res.status(200).json({ message: '日報を更新しました', data: existingReport });
     } else {
      // 新しい日報の作成
        const newReport = new Report({
             userId,
           username,
        day: today,
           isHoliday,
        issues,
        reports,
      tomorrow,
    });

       await newReport.save();
       return res.status(201).json({ message: '日報を作成しました', data: newReport });
      }
      } catch (error) {
      console.error(error)
        res.status(500).json({ message: '日報の保存に失敗しました', error: error.message });
        }
    };