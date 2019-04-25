//IMPORT DATA
let { Tasks, Projects, Employees } = require("../data/data");

//IMPORT TASK MODEL
const Task = require("../models/Task");

//IMPORT TIME MANAGING FUNCTION
const { addOrRemoveTimeFromProject } = require("./ProjectsModule");

function createTask(taskData) {
    let task = new Task(taskData.name, taskData.description, taskData.duration);

    //Save to variable, so it can be used later.
    Tasks.push(task);

    //Return the task, so it can be assigned to a variable if needed.
    return task;
}

function editTaskDuration(task, newDuration) {
    if (Projects.length > 0) {
        for (let i = 0; i < Projects.length; i++) {
            let currentProject = Projects[i];
            if (currentProject.tasks.length > 0) {
                for (let j = 0; j < currentProject.tasks.length; j++) {
                    let currentTask = currentProject.tasks[j];
                    if (currentTask.name === task.name && currentTask.description === task.description) {
                        let days = currentTask.duration - newDuration;

                        currentTask.duration = newDuration;
                        if (days < 0) {
                            currentProject.endDate = addOrRemoveTimeFromProject("remove", days, currentProject);
                        } else {
                            currentProject.endDate = addOrRemoveTimeFromProject("add", Math.abs(days), currentProject);
                        }
                    }
                    currentProject.tasks[j] = currentTask;
                }
            }
        }
    }
    task.duration = newDuration;
    return task;
}

function deleteTask(task) {
    _removeTaskFromTasks(task);
    _removeTaskFromProjects(task);

    function _removeTaskFromTasks(task) {
        let taskIndex = Tasks.indexOf(task);
        if (taskIndex !== -1) {
            Tasks.splice(taskIndex, 1);
        }
    }
    function _removeTaskFromProjects(task) {

        for (let i = 0; i < Projects.length; i++) {
            let currentProject = Projects[i];
            let taskIndex = currentProject.tasks.indexOf(task);
            if (taskIndex !== -1) {
                let days = currentProject.tasks[taskIndex].duration;
                currentProject.endDate = addOrRemoveTimeFromProject("remove", days, currentProject);
                currentProject.tasks.splice(taskIndex, 1);
            }
        }
    }
}

module.exports = {
    createTask,
    editTaskDuration,
    deleteTask
};