const express = require("express");
const router = express.Router();
const {findAll, addTask, updateStatus, deleteOneById} = require("../controllers/listController");


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
  router.post("/toDoList", addTask);
  
  //update status
  router.patch("/toDoList/:type", updateStatus);
  
  //find all
  router.get("/toDoList", findAll);
  
  
  //Delete one by ID
  router.post("/toDoList/:type", deleteOneById);
  
  
  module.exports = router;