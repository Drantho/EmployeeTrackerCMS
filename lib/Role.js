const connection = require("./Database");

class Role {
    constructor(title, salary, department = {}, id="") {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }

    setId(id){
        this.id = id;
    }

    displayRole(){
        console.log(`Role ID: ${this.id}`);
        console.log(`Role title: ${this.title}`);
        console.log(`Role salary: ${this.salary}`);
        console.log(`Role department: ${this.department.name}`);
        console.log(`-----------------------------------`);
    }

    async saveRoleToDatabase() {
        const promise = new Promise((resolve, reject) => {

            connection.query(`INSERT INTO role(title, salary, department_ref) VALUES(?, ?, ?)`, [this.title, this.salary, this.department.id], (error, results, field) => {
                if (error) {
                    throw (error);
                }
    
                this.setId(results.insertId);
                resolve(results.insertId);
            })

        })        

        return await promise;
    }

    static async getRoles() {
        const promise = new Promise((resolve, reject) => {
            
            connection.query(`SELECT role.id as role_id, title, salary, department.id as department_id, department_name FROM role INNER JOIN department ON role.department_ref = department.id`, (error, results, field) => {
                if (error) {
                    throw (error);
                }
                
                resolve(results.map(role => ({name: role.title + " - " + role.department_name, value: role})));

            })            
        })
        
        return await promise;
    }

    static async viewRoles(){
        console.table((await Role.getRoles()).map(role => role.value) );
    }
}

module.exports = Role;