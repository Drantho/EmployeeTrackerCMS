const inquirer = require("inquirer");
const Department = require("./lib/Department");

const mainQuestions = [
    {
        "name": "action",
        "type": "list",
        "message": "What would you like to do?",
        "choices": ["Add Department", "View Departments", "Quit"]
    }
]

const addDepartmentquestions = [
    {
        "name": "name",
        "type": "type",
        "message": "Enter department name: "
    }
]

const main = () => { 

    inquirer.prompt(mainQuestions).then(response => {
        switch(response.action){
            case "Add Department":
                addDepartment();                
                break;
            case "View Departments" :
                viewDepartments();
                break;
            default :
                return;
        }
    })
}

main();

const addDepartment = async () =>{

    const response = await inquirer.prompt(addDepartmentquestions);

    console.log(response);

    const department = new Department(response.name);
    department.setId( await department.saveDepartmentToDatabase());

    department.displayDepartment();

    main();

}

const viewDepartments = async () => {
    const list = await new Department().getDepartments();
    console.table(list);
    main();
}