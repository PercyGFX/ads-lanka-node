const express = require('express');
const router = express.Router();
const {indexposts} = require('../controllers/postContoller');


router.get('/:pageid', indexposts );

  module.exports = router;