const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/auth');


console.log('ReportController:', reportController); // デバッグ用

// 日報の作成または更新
router.post('/reportCreate', reportController.reportCreate);

module.exports = router;