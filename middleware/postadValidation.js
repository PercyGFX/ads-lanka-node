const expressValidator = require('express-validator');

const postadValidation = [
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
];

module.exports = postadValidation;