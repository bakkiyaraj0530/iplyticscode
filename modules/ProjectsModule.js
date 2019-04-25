//IMPORT DATA
let { Tasks, Projects, Employees } = require("../data/data");

//IMPORT MODEL
const Project = require("../models/Project");

function createProject(projectData) {
    let project = new Project(projectData.name, projectData.startDate, projectData.timeSlack);
    let days = Number(new Date(projectData.startDate).getDate()) + Number(projectData.timeSlack) - 1;
    let dateAsNumber = new Date (new Date(project.startDate).setDate(days));
    project.endDate = _getMonthAsString(dateAsNumber.getMonth()) + " " + dateAsNumber.getDate() + " " + dateAsNumber.getFullYear();
    project.tasks = [];

    //Save to variable Projects, so it can be used later.
    Projects.push(project);

    //Return the project, so it can be assigned to a variable if needed.
    return project;
}

function addTaskToProject(project, task) {
    let projectIndex = Projects.indexOf(project);

    if (projectIndex !== -1) {
        let taskDuration = Number(task.duration);
        project.endDate = addOrRemoveTimeFromProject("add", taskDuration, project);
        project.tasks.push(task);
        Projects.splice(projectIndex, 1, project);
    } else {
        console.log(`[ERROR]: Couldn't find such a project!`);
    }

    return project;
}

function deleteProject(project) {
    let tasks = project.tasks;
    _removeProjectFromProjects(project);
    _removeProjectFromEmployees(project);

    function _removeProjectFromProjects(project) {
        let projectIndex = Projects.indexOf(project);
        if (projectIndex !== -1) {
            Projects.splice(projectIndex, 1);
        }
    }
    function _removeProjectFromEmployees(project) {
        for (let i = 0; i < Employees.length; i++) {
            let currentEmployee = Employees[i];
            let projectIndex = currentEmployee.projects.indexOf(project);
            if (projectIndex !== -1) {
                 currentEmployee.projects.splice(projectIndex, 1);
            }
        }
    }
}

function getAllTasksInProject(project) {
    let projectIndex = Projects.indexOf(project);

    if (projectIndex !== -1) {
        console.log(`Listing all tasks for project ${project.name}`);
        project.tasks.forEach((task, index) => {
            console.log(`Task ${index + 1}:`);
            console.log(task);
        });
    } else {
        console.log(`You are trying to display tasks of unexisting/deleted project!`);
    }
}

function getDaysNeededForProjects(listOfProjects) {
    let days = 0;
    if (listOfProjects.length > 0) {
        listOfProjects.forEach((project, index) => {
            days += Number(project.timeSlack);

            if (project.tasks.length > 0) {
                project.tasks.forEach((task, index) => {
                    days += Number(task.duration);
                })
            }
        });
    } else {
        console.log("You are giving me an empty array." +
            "Please provide me an array with at least one element in it..");
    }
    console.log(`Days needed for the required projects: ${days}`);
}

function addOrRemoveTimeFromProject(command, daysToAddOrSubtract, project) {
    let days;
    switch (command) {
        case "add":
            days = Number(new Date(project.endDate).getDate()) + Number(daysToAddOrSubtract);
            break;
        case "remove":
            days = Number(new Date(project.endDate).getDate()) - Number(daysToAddOrSubtract);
            break;
    }

    let dateAsNumber = new Date (new Date(project.endDate).setDate(days));
    project.endDate = _getMonthAsString(dateAsNumber.getMonth()) + " " + dateAsNumber.getDate() + " " + dateAsNumber.getFullYear();
    return project.endDate;
}

function _getMonthAsString(monthAsNumber) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthAsNumber];
}

module.exports = {
    createProject,
    addTaskToProject,
    addOrRemoveTimeFromProject,
    deleteProject,
    getAllTasksInProject,
    getDaysNeededForProjects
};