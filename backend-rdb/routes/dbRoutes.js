const express = require("express");
const router = express.Router();
const {findAll, addTask, updateStatus, deleteTask} = require("../controllers/listController");


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
    try {
      const savedTask = await addTask({ task });
      res.json(savedTask)
    } catch (err) {
      res.json({message: err})
    }
  });
  
  //update status
  router.patch("/toDoList/:type", async (req, res) => {
    const {id, task, doneStatus} = req.body;
    const actionType = req.params.type;
    try {
      const savedList = await updateStatus({id, task, doneStatus, actionType});
      res.json(savedList)
    } catch (err) {
      res.json({message: err});
    }
  });
  
  //find all
  router.get("/toDoList", async (req, res) => {
    try {
      const lists = await findAll()
      res.json(lists);
    } catch (err) {
      res.json({message: err});
    }
    
  });
  
  
  //Delete one by ID
  router.post("/toDoList/:type", async (req, res) => {
    const {id} = req.body;
    const actionType = req.params.type;
    try {
      const resultMessage = await deleteTask({id, actionType})
      res.json(resultMessage)
    } catch (err) {
      res.json({message: err});
    }
  });
  
  
  module.exports = router;