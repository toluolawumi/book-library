const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();//allows to use the variables in .env


const {CONNECTIONSTRING} = process.env;//bringing out the CONNECTIONURI variable
//connection string
const connectionString = process.env.CONNECTIONSTRING || CONNECTIONSTRING;
//const connectionString = "mongodb://localhost:27017/bookapp"

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
