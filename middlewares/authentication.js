const jwt = require("jsonwebtoken")

require('dotenv').config();
const secret = process.env.SECRET || SECRET;

exports.authenticateUser = (req, res, next) => {
    //check if there is an authentication token{}
    if (!req.headers.authorization) {
        return res.status(401).json({message: "Authorization header required"})
    }
    //decode token
    let splittedHeader = req.headers.authorization.split(' ')
    if (splittedHeader[0] !== "Bearer"){
        return res.status(401).json({message: "authorization format is: bearer <token>"})
    }

    let token = splittedHeader[1]
    //check if valid
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) return res.status(500).json({err})
        if(!decodedToken){
            return  res.status(401).json({message: "invalid authorization token, please login"})
        }
        //allow user to continue the request
        console.log(decodedToken)
        req.user = decodedToken;
        next()
    })  
}

exports.checkIfAdmin = (req,res,next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({message: "this route is restricted to admin users"})
    }
    return next()
}