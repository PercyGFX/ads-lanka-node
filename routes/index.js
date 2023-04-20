const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   

    if(req.session.phone) {
      res.send('hello' + req.session.phone)
    } else{

      res.send('please login')
    }
  });

  module.exports = router;