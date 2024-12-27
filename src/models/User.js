const mongoose = require('mongoose');

//ユーザーのデータを管理する
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
    email: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 6 }
});

const User = mongoose.model('User', userSchema);



module.exports = { User };
