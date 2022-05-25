const express = require("express");
const router = express.Router();
const list = require("../models/list");

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
  const newList = new list({
    task: task,
    doneStatus: false,
  });
  newList.save((err) => {
    !err ? res.json("create success") : res.send(err);
  });
});

//update status
router.patch("/toDoList/:type", (req, res) => {
  console.log(req.body);
  const {id, task, doneStatus} = req.body;
  if (req.params.type === "byID") {
    list.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      (err) => {
        !err ? res.json("patch success") : res.send(err);
      }
    );
  }
  
});

//find all
router.get("/toDoList", (req, res) => {
  list.find({}, (err, foundRecords) => {
    if (err) {
      res.send(err);
    } else {
      res.json(foundRecords);
    }
  });
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
  console.log(req.body);
  const {id} = req.body;
  if (req.params.type === "deleteAll") {
    list.deleteMany()
    .then(() => {
      res.json("Record is deleted!");
    })
    .catch((err) => {
      res.json("Delete failure!");
    });
  } else {
    list.findByIdAndDelete(id)
    .then(() => {
      res.json("Record is deleted!");
    })
    .catch((err) => {
      res.json("Delete failure!");
    });
  }

});

module.exports = router;
