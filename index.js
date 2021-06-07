const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || PORT;

//middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//require database folder and function
const dbSetup = require('./database/setup');
dbSetup();

//require routes
const bookRoutes = require('./routes/bookRoutes');
app.use(bookRoutes)

const authRoutes = require('./routes/authRoutes')
app.use('/auth', authRoutes);

//seeders
const {seedAdmin} = require('./seeders/admin')
//console.log(seedAdmin())

//port listen
app.listen(port)
    console.log(`app listening on port ${port}`)