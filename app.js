const inquirer = require("inquirer");
const Department = require("./lib/Department");

const questions = [
    {
        "name": "name",
        "type": "type",
        "message": "Enter department name: "
    }
]

inquirer.prompt(questions).then(response => {
    const department = new Department(response.name);

    department.setId(department.saveDepartmentToDatabase());
    
    department.displayDepartment();
})