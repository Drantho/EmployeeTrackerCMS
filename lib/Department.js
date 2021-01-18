const connection = require("./Database");

class Department {
    constructor(name, id = "") {
        this.name = name;
        this.id = id;
    }

    displayDepartment = () => {
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
    }

    setId = id => {
        this.id = id;
    }

    getDepartmentById = id => {
        
        connection.query(`USE EmployeeTracker; SELECT * FROM department WHERE id = ?`, [id], (error, results, field) => {
            if (error) {
                throw (error);
            }

            console.log(`results: `, results);
        })
    }

    getDepartmentByName = name => {
        
        connection.query(`SELECT * FROM department WHERE name = ?`, [name], (error, reconnecsults, field) => {
            if (error) {
                throw (error);
            }

            console.log(`results: `, results);
        })
    }

    async saveDepartmentToDatabase() {
        const promise = new Promise((resolve, reject) => {

            connection.query(`INSERT INTO department(department_name) VALUES(?)`, [this.name], (error, results, field) => {
                if (error) {
                    throw (error);
                }
    
                this.setId(results.insertId);
                resolve(results.insertId);
            })

        })        

        return await promise;
    }

    async getDepartments() {
        const promise = new Promise((resolve, reject) => {
            
            connection.query(`SELECT * FROM department ORDER BY id`, (error, results, field) => {
                if (error) {
                    throw (error);
                }

                // console.table(results);
                resolve(results);

            })
        })

        // console.log(await promise);
        return await promise;
    }

}

module.exports = Department;