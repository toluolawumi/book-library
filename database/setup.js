const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();//allows to use the variables in .env

//connection string
const connectionString = process.env.CONNECTIONSTRING || CONNECTIONSTRING;


module.exports = () => {
    mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
.then((result)=> {
    console.log('db connected...')
    })
.catch(err => {
    console.log(err)
})
}
