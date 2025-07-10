const mysql = require('mysql2/promise');
module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'crave_tea'
});
