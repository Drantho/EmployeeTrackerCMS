const connection = require("./Database");

class Role {
    constructor(id, title, salary, department) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }

    displayRole = () => {
        console.log(`Role ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Salary: ${this.salry}`);
        console.log(`Department: `);
        this.department.displayDepartment();
    }

    getRoleById = id => {
        connection.connect();

        connection.close();
    }

    saveRoleToDatabase() {

    }
}