const {findAll, addTask, updateStatus, deleteTask} = require("../controllers/memService");
const mocha = require("mocha");
const chai = require("chai");


const assert = require('chai').assert;

describe('App', () => {
  describe('findAll', () => {
    it('should return an empty array', async () => {
      const result = await findAll();
      assert.deepEqual(result, []);
    });
  });

  describe('addTask', () => {
    it('should add a new task', async () => {
      const task = 'Buy groceries';
      const result = await addTask({ task });
      assert.include(result, { task, doneStatus: false });
    });
  });

  describe('updateStatus', () => {
    it('should update a task status', async () => {
      const task = 'Buy groceries';
      const newTask = 'Buy milk';
      const id = (await addTask({ task }))._id;
      const result = await updateStatus({ id, task: newTask, doneStatus: true, actionType: 'byID' });
      assert.include(result, { task: newTask, doneStatus: true });
    });

    it('should return an error message if the task is not found', async () => {
      const result = await updateStatus({ id: 'fake_id', task: 'Buy milk', doneStatus: true, actionType: 'byID' });
      assert.deepEqual(result, { message: 'No record found!' });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = 'Buy groceries';
      const id = (await addTask({ task }))._id;
      const result = await deleteTask({ id, actionType: 'byID' });
      assert.deepEqual(result, { message: 'Record is deleted!' });
    });

    it('should delete all tasks', async () => {
      await addTask({ task: 'Buy groceries' });
      await addTask({ task: 'Clean house' });
      const result = await deleteTask({ actionType: 'deleteAll' });
      assert.deepEqual(result, { message: 'Records are deleted!' });
    });

    it('should return an error message if the task is not found', async () => {
      const result = await deleteTask({ id: 'fake_id', actionType: 'byID' });
      assert.deepEqual(result, { message: 'No record found!' });
    });
  });
});

// describe("Test service for memory storage", () => {
//     it("test add task", async () => {
//         const res = await addTask({task: "new task one"})
//         chai.expect(res).to.deep.include({task:"new task one", doneStatus:false})
//     })

//     it("test add task", async () => {
//         const res = await addTask({task: "new task two"})
//         chai.expect(res).to.deep.include({task:"new task two", doneStatus:false})
//     })

//     it("test find all", async () => {
//         const res = await findAll();
//         chai.expect(res).to.be.an("array");
//         chai.expect(res.map(r => r.task)).to.include("new task two")
//         chai.expect(res.map(r => r.task)).to.include("new task one")
//     })
    
// })

