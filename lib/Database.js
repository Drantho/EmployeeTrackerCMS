const mySQL = require("mysql");
var connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker'
});

module.exports = connection;