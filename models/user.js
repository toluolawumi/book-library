const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//createschema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:['regular','admin'],
        default: "regular"
    }
})


const User = mongoose.model('user', userSchema)

module.exports = User;

