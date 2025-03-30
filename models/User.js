const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    dob: String,
    password: String
});

module.exports = model('User', UserSchema);
