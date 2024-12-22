const mongoose = require('mongoose');

//ユーザーのデータを管理する
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);



module.exports = { User };
