const mongoose = require('mongoose');

const Schema = mongoose.Schema

const deneme = new Schema({
    firstname: String,
    lastname: String,
    email: {
        unique: true,
        type: String
    },
    password: String,
    gender: String,
    birthday: Date,
    wight: Number,
    tall: Number,

}, {timestamps: true})

const Deneme = mongoose.model('Deneme', deneme)
module.exports = Deneme