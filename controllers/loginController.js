const axios = require('axios');
const express = require('express');
const connection = require('../database')




exports.login = (req, res) => {
  if (req.session.phone) {
    res.json({ success: true, message: 'already logged in' });
    return;
  }

  const phone = req.body.phone;
  const token = req.body.token;
  const api_key = 'AIzaSyCCifumMfBcy8ugxcED55JZdDcuSh35HgM';
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`;
  const requestData = {
    idToken: token,
  };

  axios
    .post(url, requestData)
    .then((response) => {
      if (response.data.users[0].phoneNumber == phone) {
        req.session.phone = phone;
        console.log('Phone number matches');

        
       
        let q = "SELECT * from user WHERE phone_number = ?"

        connection.execute(q , [phone] , (err,result)=>{

          

          if(err){

            console.log(err)
          }

          
          
          if(result.length < 1) {
            const q = "INSERT INTO user (phone_number, is_active, verified) VALUES (?, ?, ?)";
            const values = [phone, 1, 0];
          
            connection.execute(q, values, (err, result)=>{
              if (err) {
                console.log(err + ' user insertion fail');
              } else {
                console.log('new user added');
                res.redirect(303, '/');
              }
            });
          } else {
            console.log(result);
            res.redirect(303, '/');
          }

        })

       
        
       
      } else {
        res.status(400).json({ success: false, message: 'Something went wrong' });
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};