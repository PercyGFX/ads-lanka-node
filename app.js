const express = require('express')
const app = express()
const mysql = require('mysql2')
const session = require('express-session')
const axios = require('axios');

app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: 'damnthisissosecret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req,res)=>{

    res.send("hello")
})

app.get('/login', (req,res)=>{

    if(req.session.phone) {

        res.redirect('/')
    }else {

    res.sendFile(__dirname+"/login.html");
    }
})

app.post('/login', (req,res)=>{

    if(req.session.phone) {

        res.json({ success: true, message: 'already logged in' });
    }

    if(!req.session.phone) {
    phone = req.body.phone
    token = req.body.token

    

    const api_key = "AIzaSyCCifumMfBcy8ugxcED55JZdDcuSh35HgM";

    
const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`;
const requestData = {
  idToken: token
};

axios.post(url, requestData)
  .then(response => {

    console.log(response.data)
    if (response.data.users[0].phoneNumber == phone) {

        req.session.phone = phone;
        console.log('Phone number matches');
        res.redirect(303, '/');
      } else {
        res.status(401).json({ success: false, message: 'Something went wrong' })
      }
   


  })
  .catch(error => {
    console.error(error);
  });



 }
})


app.listen(5000,()=>{

    console.log('working')
})