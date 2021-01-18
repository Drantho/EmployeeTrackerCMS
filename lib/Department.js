const connection = require("./Database");

class Department{
    constructor(name, id=""){
        this.name = name;
        this.id = id;
    }

    displayDepartment = () =>{
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
    }

    setId = id =>{
        this.id = id;
    }

    getDepartmentById = id =>{
        connection.connect();
        connection.query(`USE EmployeeTracker; SELECT * FROM department WHERE id = ?`, [id], (error, results, field) =>{
            if(error){
                throw(error);
            }

            console.log(`results: `, results);
        })
        connection.end();
    }

    getDepartmentByName = name =>{
        connection.connect();
        connection.query(`SELECT * FROM department WHERE name = ?`, [name], (error, results, field) =>{
            if(error){
                throw(error);
            }

            console.log(`results: `, results);
        })
        connection.end();
    }
    
    saveDepartmentToDatabase(){
        connection.connect();
        const returnID = connection.query(`INSERT INTO department(department_name) VALUES(?)`, [this.name], (error, results, field) =>{
            if(error){
                throw(error);
            }

            this.setId(results.insertId);
            this.displayDepartment();
        })
        connection.end();

    }

    
}

module.exports = Department;