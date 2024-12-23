const mongoose = require('mongoose');

//レポートのデータを管理する
const reportSchema = new mongoose.Schema({
    username: String,
    date: Date,
    isHoliday: Boolean,
    tasks: [String],
    report: String,
    tomorrow: String
});

const Report = mongoose.model('Report', reportSchema);

module.exports = { Report };
