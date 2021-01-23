// database connection config
const mySQL = require("mysql");

const connection = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
});

module.exports = connection;