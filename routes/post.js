const express = require('express');
const router = express.Router();
const authentication = require('../authentication')
const expressValidator = require('express-validator');




const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/postad', upload.single('file'), 
[
expressValidator.body('title').notEmpty().withMessage('Title is required').isLength({ max: 50 }).withMessage('Title is maximum 50 words'),
expressValidator.body('category').notEmpty().withMessage('category is required'),
expressValidator.body('location').notEmpty().withMessage('location is required'),
expressValidator.body('description').notEmpty().withMessage('description is required').isLength({ max: 500 }).withMessage('description is maximum 500 words'),

expressValidator.check('image').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    } else if (!/^image\/(jpeg|png|jpg)$/.test(req.file.mimetype)) {
      throw new Error('Only JPEG, PNG and JPG files are allowed');
    } else if (req.file.size > 5000000) {
      throw new Error('File size cannot exceed 1 MB');
    }
    return true;
  })
]
,(req, res) => {
 
  
  const errors = expressValidator.validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }else {
                console.log(req.file);
                res.send('form submitted successfully');
            }

});



















// const upload = multer({ dest: 'uploads/' })

// router.post('/postad',[
//     
    
//     // expressValidator.body('image').notEmpty().withMessage('Image file is required')
//     // .custom((value, { req }) => {
//     //   if (!req.files || Object.keys(req.files).length === 0) {
//     //     throw new Error('No files were uploaded.');
//     //   }
//     //   const file = req.files.image;
//     //   const fileType = file.mimetype.split('/')[1];
//     //   if (fileType !== 'jpg' && fileType !== 'png') {
//     //     throw new Error('Only JPG and PNG files are allowed');
//     //   }
//     //   return true;
//     // })

//   ],
//    (req,res)=>{

//     // const errors = expressValidator.validationResult(req)

//     // if (!errors.isEmpty()) {
//     //     return res.status(400).json({ errors: errors.array() });
//     //   }

//     // Use the Multer middleware to handle the "image" field
//   upload.single('image')(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       // Handle Multer errors
//       return res.status(400).json({ errors: [{ msg: 'Error uploading file' }] });
//     } else if (err) {
//       // Handle other errors
//       return res.status(400).json({ errors: [{ msg: err.message }] });
//     }

//     // Validation for other fields
//     const errors = expressValidator.validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Save the image to disk
//     const file = req.file;
//     const fileType = file.mimetype.split('/')[1];
//     if (fileType !== 'jpg' && fileType !== 'png') {
//       fs.unlinkSync(file.path); // Delete the file if it's not a JPG or PNG
//       return res.status(400).json({ errors: [{ msg: 'Only JPG and PNG files are allowed' }] });
//     }
//     const fileName = `${Date.now()}_${file.originalname}`;
//     const filePath = path.join(__dirname, '../uploads', fileName);
//     fs.renameSync(file.path, filePath);

//     // Handle the rest of the request
//     res.status(200).json({ success: true });
//   });


// })



module.exports = router;