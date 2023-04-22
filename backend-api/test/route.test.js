const app = require("../app");
const mocha = require("mocha");
const chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = require("chai").expect;

describe("To-Do List API", () => {
  describe("POST /toDoList", () => {
    it("should add a new task to the list", (done) => {
      chai
        .request(app)
        .post("/api/toDoList")
        .send({
          task: "Test task",
        })
        .end((err, res) => {
          console.log(err);
          expect(res).to.have.status(200);
          expect(res.body.task).to.equal("Test task");
          expect(res.body.doneStatus).to.be.false;
          expect(res.body).to.have.property("_id");
          done();
        });
    });

    it("should return an error if the request body is invalid", (done) => {
      chai
        .request(app)
        .post("/api/toDoList")
        .send({
          invalid: "request",
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("message");
          done();
        });
    });
  });

  describe("PATCH /toDoList/:type", () => {
    let taskId;

    before(async () => {
      // Add a task to the list to update its status later
      const res = await chai.request(app).post("/api/toDoList").send({
        task: "Task to update",
      });
      taskId = res.body._id;
    });

    it("should update a task status", (done) => {
      chai
        .request(app)
        .patch(`/api/toDoList/byID`)
        .send({
          id: taskId,
          doneStatus: true,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body._id).to.equal(taskId);
          expect(res.body.doneStatus).to.be.true;
          done();
        });
    });

    it("should return an error if the task does not exist", (done) => {
      chai
        .request(app)
        .patch(`/api/toDoList/byID`)
        .send({
          id: "9998",
          doneStatus: true,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("message");
          done();
        });
    });
  });

  describe("GET /toDoList", () => {
    before(async () => {
      // Add some tasks to the list
      await chai.request(app).post("/api/toDoList").send({
        task: "Task 1",
      });

      await chai.request(app).post("/api/toDoList").send({
        task: "Task 2",
      });
    });

    it("should get all tasks in the list", (done) => {
      chai
        .request(app)
        .get("/api/toDoList")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(5);
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]).to.have.property("task");
          expect(res.body[0]).to.have.property("doneStatus");
          done();
        });
    });
  });

//   describe("DELETE /api/toDoList/:type", () => {
//     it("should delete a task by id", (done) => {
//       const id = 1; // assuming a task with id 1 exists in the database/memory
//       const actionType = "done"; // assuming the task has the 'done' status
//       chai
//         .request(app)
//         .post(`/api/toDoList/${actionType}`)
//         .send({ id })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body)
//             .to.have.property("message")
//             .equal(`Task with id ${id} has been deleted.`);
//           done();
//         });
//     });

//     it("should return an error message if task id is not provided", (done) => {
//       const actionType = "done"; // assuming the task has the 'done' status
//       chai
//         .request(app)
//         .post(`/api/toDoList/${actionType}`)
//         .end((err, res) => {
//           expect(res).to.have.status(400);
//           expect(res.body)
//             .to.have.property("message")
//             .equal("Task id is required.");
//           done();
//         });
//     });

//     it("should return an error message if task id does not exist", (done) => {
//       const id = 999; // assuming no task exists with id 999
//       const actionType = "done"; // assuming the task has the 'done' status
//       chai
//         .request(app)
//         .post(`/api/toDoList/${actionType}`)
//         .send({ id })
//         .end((err, res) => {
//           console.log(res.body);
//           //expect(res).to.have.status(404);
//           expect(res.body)
//             .to.have.property("message")
//             .equal(`No record found!`);
//           done();
//         });
//     });
//   });
});

// describe("/api/toDoList endpoint", () => {
//     it("should return a response and result array", async () => {
//         const res = await chai.request(app).get("/api/toDoList")
//         chai.expect(res.status).to.be.equal(200)
//         chai.expect(res.body).is.be.an("array")
//     })
// })
