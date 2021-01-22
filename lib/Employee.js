const connection = require("./Database");

class Employee{
    constructor(firstname, lastname, role, manager={id: 0}, id=""){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.manager = manager;
    }

    displayEmployee = () =>{
        console.log(`id: ${this.id}`);
        console.log(`firstname: ${this.firstname}`);
        console.log(`lastname: ${this.lastname}`);
        console.log(`-------------------------------------------------------`);
    }

    setId = id => {
        this.id = id;
    }

    async saveEmployeeToDatabase() {
        const promise = new Promise((resolve, reject) => {

            console.log(`attempting to save: `, this);

            connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`, [this.firstname, this.lastname, this.role.id, this.manager.id], (error, results, field) => {
                if (error) {
                    throw (error);
                }
    
                this.setId(results.insertId);
                resolve(results.insertId);
            })

        })        

        return await promise;
    }

    updateEmployeeInDatabase(){
        connection.query("UPDATE employee SET ? WHERE ?", [
            {
                first_name: this.firstname, 
                last_name: this.lastname, 
                role_id: this.role.id, 
                manager_id: this.manager.id
            },
            {
                id: this.id
            }], (err, response)=>{

        })
    }

    deleteEmployeeFromDatabase(){
        connection.query("DELETE FROM employee WHERE ?", { id: this.id }, (err) => {
            if (err) {
                throw err
            }
            
        })
    }

    static async getEmployees() {
        const promise = new Promise((resolve, reject) => {
            
            connection.query(`SELECT 
            e.id,
            e.first_name, 
            e.last_name, 
            role.id as role_id,
            title,
            salary,
            department.id as department_id,
            department_name,
            m.id as manager_id,
            m.first_name as manager_first_name, 
            m.last_name as manager_last_name
            FROM employee e
            INNER JOIN role 
            ON e.role_id = role.id 
            INNER JOIN department 
            ON role.department_ref = department.id 
            LEFT OUTER JOIN employee m 
            ON e.manager_id = m.id`, (error, results, field) => {
                if (error) {
                    throw (error);
                }
                
                resolve(results.map(employee => ({name: employee.first_name + " " + employee.last_name, value: employee})) );

            })            
        })
        
        return await promise;
    }

    static async viewEmployees(){
        console.table((await Employee.getEmployees()).map(employee => employee.value));
    }
}

module.exports = Employee;