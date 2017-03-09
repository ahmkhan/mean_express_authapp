/*
 Created by Ahmer Khan on 28-Feb-17.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//mongoose Setting
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected Successfully to ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose Connection Error ' + err);
});
//mongoose Setting

const app = express();
const usersRoutes = require('./routes/usersRoutes');

//PORT Number
const port = process.env.PORT || 8000;

//CORS MIddleware
app.use(cors());

//Set Static Client Folder
app.use(express.static(path.join(__dirname, 'public')));

//BODY Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//Passport Middleware

app.use('/users', usersRoutes);


app.get('/', (req, res) => {
    res.send('Invalid EndPoint');
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

