var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '025987',
  database : 'open'
});

connection.connect();

connection.query('SELECT * FROm topic', function (error, results, fields) {
  if (error) {
    console.log(error);
  };
  console.log('The solution is: ', results);
});

connection.end();
