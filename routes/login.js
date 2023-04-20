const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/login', (req, res) => {
    if (req.session.phone) {
      res.redirect('/');
    } else {
        const loginFilePath = path.join(__dirname, '../login.html');
    res.sendFile(loginFilePath);
    }
  });

  router.get('/logout', (req,res)=> {

    if (req.session.phone) {
      delete req.session.phone;
      
    }

    res.redirect('/');

  })
  
  router.post('/login', loginController.login);
  
  module.exports = router;