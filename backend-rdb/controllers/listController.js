
const { sequelize } = require("../models/db");
const db = require("../models/db");
const { QueryTypes } = require('sequelize');
const list = db.lists;
const op = db.Sequelize.Op;

exports.findAll = async () => {
    try {
        const query = "Select id as _id, task, doneStatus, createdAt, updatedAt from lists"
        //const foundRecords = await list.findAll({});
        foundRecords = await sequelize.query(query, {type: QueryTypes.SELECT});
        return foundRecords;
    } catch (err) {
        console.log(err);
        throw err
    }
}

exports.addTask = async ({task}) => {
        const newList = {
        task: task,
        doneStatus: false,
        };
        try {
            await list.create(newList)
            return list
        } catch (err) {
            throw err
        }
}

exports.updateStatus = async ({id, task, doneStatus, actionType}) => {
        
       
        if (actionType === "byID") {
          try {
            savedList = await list.update({id, task, doneStatus}, {where: { id: id} })
            // const query = "Update lists set \"doneStatus\" = $status where id = $id";
            // sequelize.query(query, {
            //   bind: {status: doneStatus, id: id},
            //   type: QueryTypes.UPDATE
            // })
            return savedList
          } catch (err) {
            throw err
          }          
        }
}

exports.deleteTask = async ({id, actionType}) => {
    
    
    if (actionType === "deleteAll") {
      list.destroy({where: {}, truncate: false})
      .then(() => {
        return {message: "Records are Deleted"}
      })
      .catch((err) => {
        return {message: "Delete failure"}
      });
    } else {
      list.destroy( {where: {id: id}})
      .then(() => {
        return {message: "Record is Deleted"}
      })
      .catch((err) => {
        return {message: "Delete failure"}
      });
    }
}