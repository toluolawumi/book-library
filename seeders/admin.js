//check if there is an admin account
const User = require('../models/user')
const bcrypt = require('bcryptjs')
require('dotenv').config();
const password = process.env.PASSWORD || PASSWORD

exports.seedAdmin = () => {
    User.findOne({role: "admin"}, (err, admin) => {
        if (err) throw err
        if(admin) {
            return "admin account already exists"
        }
        
        User.create({
            firstName: "Admin",
            lastName: "AdminAdmin",
            username: "adminadmin",
            role: "admin"
        }, (err, user) => {
            if (err) throw err
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err
                bcrypt.hash(password, salt, (err, hash)=>{
                    if (err) throw err
                    user.password = hash;
                    user.save((err,savedUser) => {
                        if (err) throw err
                        return "admin account created"
                    })
                })
            })
        })
    })
}
//create an admin account
