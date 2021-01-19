const inquirer = require("inquirer");
const connection = require("./lib/Database");
const Department = require("./lib/Department");
const Role = require("./lib/Role");

const mainQuestions = [
    {
        "name": "action",
        "type": "list",
        "message": "What would you like to do?",
        "choices": ["Add Department", "View Departments", "Add Role", "View Roles", "Quit"]
    }
]

const addDepartmentquestions = [
    {
        "name": "name",
        "type": "input",
        "message": "Enter department name: "
    }
]

const main = () => {

    inquirer.prompt(mainQuestions).then(response => {
        switch (response.action) {
            case "Add Department":
                addDepartment();
                return;
            case "View Departments":
                viewDepartments();
                return;
            case "Add Role":
                addRole();
                return;
            case "View Roles":
                Role.viewRoles().then(()=>{main()});
                return;
            default:
                connection.end();
                return;
        }
    })
}

main();

const addDepartment = async () => {

    const response = await inquirer.prompt(addDepartmentquestions);

    console.log(response);

    const department = new Department(response.name);
    department.setId(await department.saveDepartmentToDatabase());

    department.displayDepartment();

    main();

}

const viewDepartments = async () => {
    const list = await new Department().getDepartments();
    console.table(list);
    main();
}

const addRole = async () => {
    const list = await new Department().getDepartments();
    
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

        const department = await Department.getDepartmentByName(response.department);

        const role = new Role(response.title, response.salary, department);

        role.setId(await role.saveRoleToDatabase());

        role.displayRole();

        main();

    })
}