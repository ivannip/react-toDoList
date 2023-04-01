const {findAll, addTask, updateStatus, deleteTask} = require("../controllers/memService");
const mocha = require("mocha");
const chai = require("chai");

describe("Test service for memory storage", () => {
    it("test add task", async () => {
        const res = await addTask({task: "new task one"})
        chai.expect(res).to.deep.include({task:"new task one", doneStatus:false})
    })

    it("test add task", async () => {
        const res = await addTask({task: "new task two"})
        chai.expect(res).to.deep.include({task:"new task two", doneStatus:false})
    })

    it("test find all", async () => {
        const res = await findAll();
        chai.expect(res).to.be.an("array");
        chai.expect(res.map(r => r.task)).to.include("new task two")
        chai.expect(res.map(r => r.task)).to.include("new task one")
    })
    
})

