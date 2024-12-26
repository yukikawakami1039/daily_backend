const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: Date},
  isHoliday: { type: Boolean, default: false },
  issues: [{ type: String }],
  report: { type: String, required: true },
  tomorrow: { type: String },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = { Report };