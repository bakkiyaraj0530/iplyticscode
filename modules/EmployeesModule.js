//IMPORT DATA
let { Tasks, Projects, Employees } = require("../data/data");

//IMPORT MODEL
const Employee = require("../models/Employee");

function createEmployee(employeeData) {
    let employee = new Employee(employeeData.name, employeeData.lastName, employeeData.supervisor);
    employee.projects = [];

    //Save to variable Employees, so it can be used later.
    Employees.push(employee);

    //Return the employee, so it can be assigned to a variable if needed.
    return employee;
}

function assignProjectToEmployee(project, employee) {
    if (employee.projects.length < 2) {
        let employeeIndex = Employees.indexOf(employee);
        if (employeeIndex !== -1) {
            employee.projects.push(project);
            Employees.splice(employeeIndex, 1, employee);
        } else {
            console.log(`[ERROR]: Error occurred while trying to assign project to employee.`);
        }

        return employee;
    }
    console.log(`[ERROR]: Employee with name: ${employee.name} ${employee.lastName} has already 2 projects! You cannot assign more!`);
    return employee;
}

function getAllEmployees() {
    if (Employees.length !== 0) {
        console.log("There is no employees. Please create one and try again!");
    } else {
        console.log("Listing all employees:");
        Employees.forEach((emp, index) => {
            console.log(`${index + 1}. ${emp.name} ${emp.lastName}`);
        });
    }
}

module.exports = {
    createEmployee,
    assignProjectToEmployee,
    getAllEmployees
};