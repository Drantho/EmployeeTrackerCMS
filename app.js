const inquirer = require("inquirer");
const Department = require("./lib/Department");

const mainQuestions = [
    {
        "name": "action",
        "type": "list",
        "message": "What would you like to do?",
        "choices": ["Add Department", "Quit"]
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
            default :
                break;
        }
    })
}

main();

const addDepartment = () =>{

    inquirer.prompt(addDepartmentquestions).then(response => {
        const department = new Department(response.name);
    
        department.saveDepartmentToDatabase(main);
    })

}