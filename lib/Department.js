const connection = require("./Database");

class Department {
    constructor(name, id = "") {
        this.name = name;
        this.id = id;
    }

    displayDepartment = () => {
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
        console.log(`-----------------------------------`);
    }

    setId = id => {
        this.id = id;
    }

    static async getDepartmentByName(name) {
        const promise = new Promise((resolve, reject) => {

            connection.query(`SELECT * FROM department WHERE department_name = ?`, [name], (error, results, field) => {
                if (error) {
                    throw (error);
                }

                const department = new Department(results[0].department_name, results[0].id);
                resolve(department);
            })

        })        

        return await promise;
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
                
                resolve(results.map(element => element.department_name));

            })
        })

        // console.log(await promise);
        return await promise;
    }

}



module.exports = Department;