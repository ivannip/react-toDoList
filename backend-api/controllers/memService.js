// Import uuidv4 to generate unique ID for the task
const uuidv4 = require("uuid").v4;

// Declare an empty array to store the tasks
let lists = [];

// Function to find all the tasks
exports.findAll = async () => {
    return lists;
}

// Function to add a new task
exports.addTask = async ({task}) => {
    // Create a new task object
    const newList = {
        _id: uuidv4(), // Generate unique ID for the task
        task: task,
        doneStatus: false,
    };

    // Add the new task to the list of tasks
    lists.push(newList);
    
    // Return the newly added task
    return newList;
} 

// Function to update the status of a task by ID
exports.updateStatus = async ({id, task, doneStatus, actionType}) => {
    if (actionType === "byID") {
        // Find the task by ID
        const list = lists.find(lt => lt._id == id);
        
        // Get the index of the task in the list of tasks
        const idx = lists.findIndex(list => list._id == id);
        
        // Update the task with the new task and done status
        if (idx > -1) {
            lists.splice(idx, 1, {...list, task: task, doneStatus:doneStatus});
            return {...list, task: task, doneStatus:doneStatus}
        } else {
            // Return error message if no task is found
            return {message: "No record found!"};
        }    
    }  
}

// Function to delete a task by ID
exports.deleteTask = async ({id, actionType}) => {
    if (actionType === "deleteAll") {
        // Delete all the tasks in the list
        lists = [];
        return {message: "Records are deleted!"};
    } else {
        // Get the index of the task in the list of tasks
        const idx = lists.findIndex(list => list._id == id)
        
        // Delete the task from the list of tasks
        if (idx > -1) {
            lists.splice(idx, 1);
            return {message: "Record is deleted!"};
        } else {
            // Return error message if no task is found
            return {message: "No record found!"};
        }
    }
}