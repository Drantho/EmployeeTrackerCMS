// get database connection
const connection = require("./Database");

class Department {
    // constructor with default for id
    constructor(name, id = "") {
        this.name = name;
        this.id = id;
    }

    // log props
    displayDepartment = () => {
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
        console.log(`-----------------------------------`);
    }

    // setter for id prop
    setId = id => {
        this.id = id;
    }

    // save department and return promise
    async saveDepartmentToDatabase() {
        const promise = new Promise((resolve, reject) => {

            connection.query(`INSERT INTO department(name) VALUES(?)`, [this.name], (error, results, field) => {
                if (error) {
                    throw (error);
                }

                this.setId(results.insertId);
                resolve(results.insertId);
            })

        })

        return await promise;
    }

    // update department and return promise
    updateDepartmentInDatabase() {
        connection.query("UPDATE department SET ? WHERE ?", [{ name: this.name }, { id: this.id }], (err, result) => {
            if (err) {
                throw err
            }

        })
    }

    // delete department and log result
    deleteDepartmentFromDatabase() {

        // delete selected department

        connection.query("DELETE FROM department WHERE ?", [{ id: this.id }], (err, result) => {
            if (err) {
                throw err
            }

            // inform user of success and call main
            console.log(`Department deleted. `);
        })

    }

    // static function to get array of departments
    static async getDepartments() {
        const promise = new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM department ORDER BY id`, (error, results, field) => {
                if (error) {
                    throw (error);
                }

                resolve(results.map(department => ({ name: department.name, value: department })));

            })
        })

        return await promise;
    }

    // static function to log departments
    static async viewDepartments() {
        console.table((await Department.getDepartments()).map(department => department.value));
    }
}



module.exports = Department;