const express = require('express');
const app = express();
const PORT = 10000;

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
app.use('/auth', authRoutes)

//port listen
app.listen(PORT)
    console.log(`app listening on port ${PORT}`)