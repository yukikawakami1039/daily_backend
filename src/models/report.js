const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // userの_idを参照する
        ref: "User",
        required: true
        },
   username: {type:String},
  day: { type: Date, default: Date.now },
 isHoliday: { type: Boolean, default: false },
issues: { type: String, },
 reports: { type: String },
tomorrow: { type: String, }
 }, {timestamps: true});

    const Report = mongoose.model('Report', reportSchema);

     module.exports = {Report} ; // モデルをエクスポート