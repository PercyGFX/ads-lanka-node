const express = require('express')
const app = express()
const mysql = require('mysql2')
const login = require('./routes/login');
const index = require('./routes/index');
const post = require('./routes/post');
const session = require('express-session')


app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'damnthisissosecret',
  resave: false,
  saveUninitialized: true
}));


app.use('/', login);
app.use('/', index);
app.use('/', post);



app.listen(5000, () => {
  console.log('Server listening on port 5000');
});