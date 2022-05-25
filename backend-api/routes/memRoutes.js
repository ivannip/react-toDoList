const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

var lists = [];

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
router.post("/toDoList", (req, res) => {
  const { task } = req.body;
  const newList = {
    _id: uuidv4(),
    task: task,
    doneStatus: false,
  };
  lists.push(newList);
  res.json("create success");
});

//update status
router.patch("/toDoList/:type", (req, res) => {
  const {id, task, doneStatus} = req.body;
  console.log(id);
  console.log(doneStatus);
  if (req.params.type === "byID") {
    const list = lists.find(lt => lt._id == id);
    const idx = lists.findIndex(list => list._id == id);
    if (idx > -1) {
      lists.splice(idx, 1, {...list, doneStatus:doneStatus});
      res.json("Record updated!");
    } else {
      res.json("No record found!");
    }    
  }  
});
  

//find all
router.get("/toDoList", (req, res) => { 
      res.json(lists);
});

//find by status
// router.get("/toDoList/:done", (req, res) => {
//   list.find({ doneStatus: req.params.done }, (err, foundRecords) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(foundRecords);
//     }
//   });
// });

//Delete one by ID
router.post("/toDoList/:type", (req, res) => {
  const {id} = req.body;
  if (req.params.type === "deleteAll") {
    lists = [];
    res.json("Records are deleted!");
  } else {
      const idx = lists.findIndex(list => list._id == id)
      if (idx > -1) {
        lists.splice(idx, 1);
        res.json("Record is deleted!");
      } else {
        res.json("No record found!");
      }
  }
});

module.exports = router;
