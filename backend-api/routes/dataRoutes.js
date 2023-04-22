const express = require("express");
const router = express.Router();

/** choose database or memory to store the list here */
//const {findAll, addTask, updateStatus, deleteTask} = require("../controllers/dbService");
const {findAll, addTask, updateStatus, deleteTask} = require("../controllers/memService");

//setup proxy for server client connection with diff ports, added for deployment in local nginx
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

//add task
router.post("/toDoList", async (req, res) => {
  const { task } = req.body;
  //validate the task input
  if (!task)
    res.status(404).json({message: "invalid request body"});

    try {
      //call addTask function to add new task to the database or memory storage
      const savedTask = await addTask({ task });
      //send back the saved task with a status code of 200
      res.status(200).json(savedTask)
    } catch (err) {
      //send back error message if any error occurred during the addTask function call
      res.status(404).json({message: err})
    }
});

//update status
router.patch("/toDoList/:type", async (req, res) => {
  
  const {id, task, doneStatus} = req.body;
  const actionType = req.params.type;
  try {
    //call updateStatus function to update the status of a task based on its id and action type
    const savedList = await updateStatus({id, task, doneStatus, actionType});
    if (savedList.message === "No record found!")
      //send back 404 status code and error message if no record is found
      res.status(404).json(savedList)
    else
      //send back the updated task with a status code of 200
      res.status(200).json(savedList)
  } catch (err) {
    //send back error message if any error occurred during the updateStatus function call
    res.status(500).json({message: err});
  }
});

//find all
router.get("/toDoList", async (req, res) => {
  try {
    //call findAll function to retrieve all tasks from the database or memory storage
    const foundLists = await findAll();
    //send back the retrieved tasks with a status code of 200
    res.json(foundLists);  
  } catch (err) {
    //send back error message if any error occurred during the findAll function call
    res.json({message: err});
  }
  
});


//Delete one by ID
router.post("/toDoList/:type", async (req, res) => {
  const actionType = req.params.type;
  const {id} = req.body;
  if (!id)
    //send back error message if no task id is provided in the request body
    res.status(400).json({message: "Task id is required"})
  try {
    //call deleteTask function to delete a task based on its id and action type
    const deletedMessage = deleteTask({id, actionType});
    //send back success message with a status code of 200
    res.status(200).json(deletedMessage);
  } catch (err) {
    //send back error message if any error occurred during the deleteTask function call
    res.status(500).json({message: err});
  }

});

module.exports = router;
