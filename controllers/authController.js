const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET || SECRET;
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
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err){
            return res.status(500).json({err})
        }
        if (!foundUser){
            return res.status(401).json({message: "incorrect username"})
        } 
         //check password is correct
        let match = bcrypt.compareSync(req.body.password, foundUser.password)

        if (!match){
            return res.status(401).json({message: "incorrect password"})
        }
        

        //create token and send token to user
        jwt.sign({
            id: foundUser.id,
            username: foundUser.username,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
        }, secret, {
            expiresIn: expiry
        }, (err, token) => {
            if (err){
                return res.status(500).json({err})
            }
            return res.status(200).json({
                message: "user logged in",
                token
            })
        })
    })
}