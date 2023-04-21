const expressValidator = require('express-validator');
const connection = require('../database')

const postadController = (req, res) => {
  const errors = expressValidator.validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // convert 5.5 hours to milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    const year = istTime.getUTCFullYear();
    const month = (istTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = istTime.getUTCDate().toString().padStart(2, '0');
    const hours = istTime.getUTCHours().toString().padStart(2, '0');
    const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = istTime.getUTCSeconds().toString().padStart(2, '0');
    const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    

    const image = req.file.filename;
    const title = req.body.title;
    const category = req.body.category;
    const location = req.body.location;
    const description = req.body.description;
    //const phone = req.session.phone;
    const phone = "+94775001170";


    const sql = `
  SELECT u.id
  FROM ads a
  JOIN user u ON a.user_id = u.id
  WHERE a.phone_number = ?
`;

// execute the query with the phone variable as a parameter
connection.query(sql, [phone], (err, results) => {
  if (err) throw err;
  if (results.length > 0) {

    const userId = results[0].id;

    const q = "INSERT INTO ads(title,phone_number,category,location,description,image, user_id , date,paid_ad) VALUES (?,?,?,?,?,?,?,?,?)" 
    const values = [title,phone,category,location,description,image, userId ,timeString,0]

    connection.execute(q, values, (err, result)=>{
      if (err) {
       res.status(400).json(err);
      } else {
        const newId = result.insertId; // get the last inserted ID
    res.status(200).json({ success: true, message: 'Post added successfully', ad_id: newId }); // add the ID to the response JSON
        
      }
    })

  }
});


    
  }
};

module.exports = postadController;