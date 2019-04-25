const EmployeesModule = require("./modules/EmployeesModule");
const ProjectsModule = require("./modules/ProjectsModule");
const TaskModule = require("./modules/TaskModule");
let { Tasks, Projects, Employees } = require("./data/data");

const tasks = [
    {name: "User Registration", description: "Commplete the Registration page.", duration: 4},
    {name: "Item Checkout", description: "Set the target date and not exceed over the due date.", duration: 6},
    {name: "Final confirmation", description: "Confirm and pay for the Items", duration: 8}
    ];
const projects = [
    {name: "GAF", startDate: "April 10 2019", timeSlack: 8},
    {name: "Care4store", startDate: "April 10 2019", timeSlack: 20}
    ];
const employees = [
    {name: "Suresh", lastName: "Sathish", supervisor: "Shan"},
    {name: "Shan", lastName: "Mugam", supervisor: "Moorthy"}
];

function ProjectManagementApp() {
    //CREATING EMPLOYEE
    let emp1 = EmployeesModule.createEmployee(employees[0]);
    //CREATING PROJECT
    let proj1 = ProjectsModule.createProject(projects[0]);
    let proj2 = ProjectsModule.createProject(projects[1]);

    let task1 = TaskModule.createTask(tasks[0]);
    let task2 = TaskModule.createTask(tasks[1]);
    let task3 = TaskModule.createTask(tasks[2]);

    //ADDING TASKS TO PROJECT
    ProjectsModule.addTaskToProject(proj1, task1);
    ProjectsModule.addTaskToProject(proj1, task2);

    //EDIT TASK DURATION
    TaskModule.editTaskDuration(task1, 3);

    EmployeesModule.assignProjectToEmployee(proj1, emp1);
    EmployeesModule.assignProjectToEmployee(proj2, emp1);

    //Now lets check if employee object updates when we add another task to project.
    ProjectsModule.addTaskToProject(proj2, task3);

    //DELETE A SINGLE TASK & ALL UNDERLYING REFERENCES
    TaskModule.deleteTask(task1);
    //GET DAYS NEEDED FOR LIST OF PROJECTS

    let firstProj = ProjectsModule.createProject({name: "Honor 9", startDate: "January 1 2019", timeSlack: 10});
    let secondProj = ProjectsModule.createProject({name: "Honor 10", startDate: "January 1 2019", timeSlack: 10});
    let taskToAdd = TaskModule.createTask({name: "Create this phone!", description: "Lorem ipsum blah bla..", duration: 5});
    ProjectsModule.addTaskToProject(firstProj, taskToAdd);
    ProjectsModule.addTaskToProject(secondProj, taskToAdd);

    //In total it has to display 30 days.
    ProjectsModule.getDaysNeededForProjects([firstProj, secondProj]);
}

ProjectManagementApp();
