class Employee{
    constructor(id, firstname, lastname, role, manager){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.manager = manager;
    }

    getEmployeeById = id =>{

    }

    displayEmployee = () =>{
        console.log(`id: ${this.id}`);
        console.log(`firstname: ${this.firstname}`);
        console.log(`lastname: ${this.lastname}`);
        console.log(`Role: `);
        this.role.displayRole();
        console.log(`Manager: `);
        this.manager.displayEmployee();
    }
}