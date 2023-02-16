const app = require("../app")
const mocha = require("mocha")
const chai = require("chai");
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("/api/toDoList endpoint", () => {
    it("should return a response and result array", async () => {
        const res = await chai.request(app).get("/api/toDoList")
        chai.expect(res.status).to.be.equal(200)
        chai.expect(res.body).is.be.an("array")
    })
})