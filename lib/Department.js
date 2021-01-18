const connection = require("./Database");

class Department{
    constructor(name){
        this.name = name;
    }

    getDepartmentById = id =>{
        connection.connect();
        log(`connection established.`);
        connection.query(`USE EmployeeTracker; SELECT * FROM department WHERE id = ?`, [id], (error, results, field) =>{
            if(err){
                throw(err);
            }

            console.log(`results: `, results);
        })
        connection.end();
    }

    getDepartmentByName = name =>{
        connection.connect();
        log(`connection established.`);
        connection.query(`USE EmployeeTracker; SELECT * FROM department WHERE name = ?`, [name], (error, results, field) =>{
            if(err){
                throw(err);
            }

            console.log(`results: `, results);
        })
        connection.end();
    }

    saveDepartmentToDatabase(){
        connection.connect();
        log(`connection established.`);
        connection.query(`USE EmployeeTracker; INSERT INTO department(name) VALUES(?); SELECT LAST_INSERT_ID() AS id`, [this.name], (error, results, field) =>{
            if(err){
                throw(err);
            }

            console.log(`results: `, results);
        })
        connection.end();
    }

    displayDepartment = () =>{
        console.log(`Department ID: ${this.id}`);
        console.log(`Department Name: ${this.name}`);
    }

    
}