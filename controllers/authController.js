const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "SECURESECRET";
const expiry = 3600;

exports.registerNewUser = (req,res) => {
    //fetch user details from request body
    //check if username exists
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if(err){
            return res.status(500).json({err})
        }
        if(existingUser){
            return res.status(400).json({message: "username already exists"})
        }
         //create a new user
        User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username
            }, (err, newUser) => {
                if(err){
                    return res.status(500).json({err})
                }
                //hash user's password
                bcrypt.genSalt(10, (err, salt) =>{
                    if(err){
                        return res.status(500).json({err})
                    }
                    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                        if(err){
                            return res.status(500).json({err})
                        }
                        //save password to database
                        newUser.password = hashedPassword;
                        newUser.save((err,savedUser) => {
                            if(err){
                                return res.status(500).json({err})
                            }
                //create token
                jwt.sign(
                    {
                        id: newUser.id,
                        username: newUser.username,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName
                    }, secret, {expiresIn: expiry}, (err, token) => {
                        if(err){
                            return res.status(500).json({err})
                        }
                        //send token to user
                        return res.status(200).json({
                            message: "user registration successful",
                            token })
                    })

                        })
                    })
                })
    })
})
   }

exports.loginUser = (req,res) => {
    //check if users exists
    //check password is correct
    
}