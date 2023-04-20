const axios = require('axios');

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
        res.redirect(303, '/');
      } else {
        res.status(400).json({ success: false, message: 'Something went wrong' });
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};