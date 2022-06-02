const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/db");
const db = require("../models/db");
const list = db.lists;
const op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
    try {
        const foundRecords = await list.findAll({});
        var returnRecords = [];
        // this logic is to duplicate a field _id when compatible with the frontend design for MongoDB
        foundRecords.forEach( rec => {
            var _temp = rec.dataValues;
            _temp["_id"] = _temp.id;
            returnRecords.push(_temp)
        })

        //console.log(returnRecords)
        res.json(returnRecords);
    } catch (err) {
        res.send(err);
    }
}

exports.addTask = async (req, res) => {
        
        const { task } = req.body;
        const newList = {
        task: task,
        doneStatus: false,
        };
        try {
            list.create(newList)
            res.json("create success") 
        } catch (err) {
            res.send(err)
        }
}

exports.updateStatus = (req, res) => {
        const {id, task, doneStatus} = req.body;
        console.log({id, task, doneStatus});
        if (req.params.type === "byID") {
          try {
            //list.update(req.body, {where: { id: id} })
            const query = "Update lists set \"doneStatus\" = $status where id = $id";
            sequelize.query(query, {
              bind: {status: doneStatus, id: id},
              type: QueryTypes.UPDATE
            })
            res.json("patch success")
          } catch (err) {
            res.send(err);
          }          
        }
}

exports.deleteOneById = (req, res) => {
    
    const {id} = req.body;
    if (req.params.type === "deleteAll") {
      list.destroy({where: {}, truncate: false})
      .then(() => {
        res.json("Record is deleted!");
      })
      .catch((err) => {
        res.json("Delete failure!");
      });
    } else {
      list.destroy( {where: {id: id}})
      .then(() => {
        res.json("Record is deleted!");
      })
      .catch((err) => {
        res.json("Delete failure!");
      });
    }
}