const mysql = require('mysql2');




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    
    console.log('Connected to database');
  });

  
  module.exports = connection