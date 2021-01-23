// get database connection
const connection = require("./Database");

class Role {
    // constructor with defaults for department and id
    constructor(title, salary, department = {}, id="") {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }

    // setter for id prop
    setId(id){
        this.id = id;
    }

    // log properties
    displayRole(){
        console.log(`Role ID: ${this.id}`);
        console.log(`Role title: ${this.title}`);
        console.log(`Role salary: ${this.salary}`);
        console.log(`Role department: ${this.department.name}`);
        console.log(`-----------------------------------`);
    }

    // save role and return promise
    async saveRoleToDatabase() {
        const promise = new Promise((resolve, reject) => {

            connection.query(`INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)`, [this.title, this.salary, this.department.id], (error, results, field) => {
                if (error) {
                    throw (error);
                }
    
                this.setId(results.insertId);
                resolve(results.insertId);
            })

        })        

        return await promise;
    }

    // update role and return promise
    async updateRoleInDatabase() {
        const promise = new Promise((resolve, reject) => {

            connection.query(`UPDATE role SET ? WHERE ?`, [{title: this.title, salary: this.salary, department_id: this.department.id}, {id: this.id}], (error, results, field) => {
                if (error) {
                    throw (error);
                }
    
                resolve("update successful.");
            })

        })        

        return await promise;
    }
    
    // delete role and log result
    async deleteRole(){
        connection.query("DELETE FROM role WHERE ?", {id: this.id}, err => {
            if(err){
                throw err
            }

        })
    }

    // static function returns list of roles
    static async getRoles() {
        const promise = new Promise((resolve, reject) => {
            
            connection.query(`SELECT role.id as role_id, title, salary, department.id as department_id, name FROM role INNER JOIN department ON role.department_id = department.id`, (error, results, field) => {
                if (error) {
                    throw (error);
                }
                
                resolve(results.map(role => ({name: role.title + " - " + role.name, value: role})));

            })            
        })
        
        return await promise;
    }

    // static function logs roles
    static async viewRoles(){
        console.table((await Role.getRoles()).map(role => role.value) );
    }
}

module.exports = Role;