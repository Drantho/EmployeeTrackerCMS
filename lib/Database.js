const mySQL = require("mysql");

const connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker'
});

module.exports = connection;