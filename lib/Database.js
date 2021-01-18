const mySQL = require("mysql");
var connection = mysql.createConnection({
    host: '127.0.0.1:3306',
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker'
});

module.exports = connection;