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
router.patch("/toDoList/:id", (req, res) => {
  list.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    (err) => {
      !err ? res.json("patch success") : res.send(err);
    }
  );
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
router.get("/toDoList/:done", (req, res) => {
  list.find({ doneStatus: req.params.done }, (err, foundRecords) => {
    if (err) {
      res.send(err);
    } else {
      res.json(foundRecords);
    }
  });
});

//Delete one by ID
router.delete("/toDoList/:id", (req, res) => {
  if (req.params.id === "all") {
    list.deleteMany()
    .then(() => {
      res.json("Record is deleted!");
    })
    .catch((err) => {
      res.json("Delete failure!");
    });
  } else {
    list.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("Record is deleted!");
    })
    .catch((err) => {
      res.json("Delete failure!");
    });
  }

});

module.exports = router;
