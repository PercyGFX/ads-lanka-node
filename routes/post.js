const router = require('express').Router();
const {postadController} = require('../controllers/postContoller');
const postadValidation = require('../middleware/postadValidation');
const {upload} = require('../multer');



// Define the postad route
router.post('/postad', upload.single('file'), postadValidation, postadController);

module.exports = router;

