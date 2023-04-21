const express = require('express')
const app = express()
const login = require('./routes/login');
const index = require('./routes/index');
const post = require('./routes/post');
const session = require('express-session')
const bodyParser = require('body-parser');




app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());



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