const expressValidator = require('express-validator');

const postadController = (req, res) => {
  const errors = expressValidator.validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const image = req.file.filename;
    const title = req.body.title;
    const category = req.body.category;
    const location = req.body.location;
    const description = req.body.description;
    const phone = req.session.phone;

    console.log(phone, description);
    res.send('form submitted successfully');
  }
};

module.exports = postadController;