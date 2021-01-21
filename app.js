const inquirer = require("inquirer");
const connection = require("./lib/Database");
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require("./lib/Employee");
const { viewEmployees } = require("./lib/Employee");

const main = () => {
    const mainQuestions = [
        {
            "name": "action",
            "type": "list",
            "message": "What would you like to do?",
            "choices": [
                "Add Department", 
                "View Departments", 
                "Update Department", 
                "Delete Department", 
                "Add Role", 
                "View Roles",
                "Update Role", 
                "Add Employee", 
                "View Employees", 
                "Quit"]
        }
    ]

    inquirer.prompt(mainQuestions).then(response => {
        switch (response.action) {
            case "Add Department":
                addDepartment();
                return;
            case "View Departments":
                Department.viewDepartments().then(() => main());
                return;
            case "Update Department":
                updateDepartment();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Add Role":
                addRole();
                return;
            case "View Roles":
                Role.viewRoles().then(()=>{main()});
                return;
            case "Update Role" :
                updateRole();
                break;
            case "Add Employee" :
                addEmployee();
                return;
            case "View Employees" :
                Employee.viewEmployees().then(()=>main())
                return;
            default:
                connection.end();
                return;
        }
    })
}
main();

const addDepartment = async () => {

    const addDepartmentquestions = [
        {
            "name": "name",
            "type": "input",
            "message": "Enter department name: "
        }
    ]
    const response = await inquirer.prompt(addDepartmentquestions);

    console.log(response);

    const department = new Department(response.name);
    department.setId(await department.saveDepartmentToDatabase());

    department.displayDepartment();

    main();

}

const updateDepartment = async () =>{
    const departments = await Department.getDepartments();

    const updateDepartmentQuestions = [
        {
            "name": "department",
            "type": "list",
            "message": "Select a department to edit",
            "choices": departments
        },
        {
            "name": "name",
            "type": "input",
            "message": "Enter new department name: "
        }
    ];

    inquirer.prompt(updateDepartmentQuestions).then(async response => {
        const department = new Department(response.name, response.department.id);
        department.updateDepartmentInDatabase();
        department.displayDepartment();
        main(); 
    });
}

const deleteDepartment = async () => {
    const departments = await Department.getDepartments();

    const deleteDepartmentQuestions = [
        {
            "name": "department",
            "type": "list",
            "message": "Select a department to delete",
            "choices": departments
        }
    ];

    inquirer.prompt(deleteDepartmentQuestions).then(response => {

        connection.query("SELECT * FROM role WHERE ?", {department_ref: response.id}, (err, data) => {

            if(data.length > 0){
                console.log(`The following roles will have their deparment link broken:`);
                console.table(data);
            }
            
            connection.query("DELETE FROM department WHERE ?", [{id: response.department.id}], (err, result) => {
                if(err){
                    throw err
                }
    
                console.log(`Department deleted. `);
                main();
            })

        })
    });
}

const addRole = async () => {
    const list = await Department.getDepartments();
    
    const addRoleQuestions = [
        {
            "name": "title",
            "type": "input",
            "message": "Enter role title: "
        },
        {
            "name": "salary",
            "type": "input",
            "message": "Enter role salary: "
        },
        {
            "name": "department",
            "type": "list",
            "message": "Select role department: ",
            "choices": list
        }
    ]

    
    inquirer.prompt(addRoleQuestions).then(async response => {

        const department = new Department(response.department.department_name, response.department.id);

        const role = new Role(response.title, response.salary, department);

        role.setId(await role.saveRoleToDatabase());

        role.displayRole();

        main();

    })
}

const updateRole = async () => {

    const departments = await Department.getDepartments();
    const roles = await Role.getRoles();

    const editRoleQuestions = [
        {
            "name": "role",
            "type": "list",
            "message": "Select role to edit",
            "choices": roles
        },
        {
            "name": "title",
            "type": "input",
            "message": "Enter role title: "
        },
        {
            "name": "salary",
            "type": "input",
            "message": "Enter role salary: "
        },
        {
            "name": "department",
            "type": "list",
            "message": "Select role department: ",
            "choices": departments
        }
    ]

    
    inquirer.prompt(editRoleQuestions).then(async response => {

        const department = new Department(response.department.department_name, response.department.id);
        const role = new Role(response.title, response.salary, department, response.role.role_id);
        
        console.log((await role.updateRoleInDatabase()));

        role.displayRole();

        main();

    })
}

const addEmployee = async () => {
    const roles = await Role.getRoles();
    const employees = await Employee.getEmployees();
    employees.push({name: "none", values: {id: 0}});

    const addEmployeeQuestions = [
        {
            "name": "firstName",
            "type": "input",
            "message": "Enter first name: "
        },
        {
            "name": "lastName",
            "type": "input",
            "message": "Enter Last Name: "
        },
        {
            "name": "role",
            "type": "list",
            "message": "Select role: ",
            "choices": roles
        },
        {
            "name": "manager",
            "type": "list",
            "message": "Select a manager",
            "choices": employees
        }
    ];

    inquirer.prompt(addEmployeeQuestions).then(async response => {

        const department = new Department( response.role.department, response.role.department_id);
        const role = new Role(response.role.title, response.role.salary, department, response.role.role_id);
        const manager = new Employee(response.manager.first_name, response.manager.last_name, {}, 0, response.manager.id || 0)
        
        const employee = new Employee(response.firstName, response.lastName, role, manager);

        employee.setId(await employee.saveEmployeeToDatabase());

        employee.displayEmployee();

        main();

    })
}