const mongoose = require("mongoose");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Task = require("../models/Task");
const User = require("../models/User");

const should = chai.should();

//update these token to run test
const testTokenUser1 = process.env.TEST_TOKEN_USER;
const testTokenUser2 = process.env.TEST_TOKEN_USER2;

chai.use(chaiHttp);
describe("-----------------Task-------------------", () => {
    let taskID;
    let testTokenUser1;
    let testTokenUser2;

    it("should   Create User for testing task API ", (done) => {
        const user = {
            name: "chiku",
            email: "chikuTest@gmail.com", //change email each time of test
            password: "Chiku@123",
            confirmPassword: "Chiku@123",
            phoneNumber: "9932232423",
        };

        chai.request(app)
            .post("/api/v1/user/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.status.should.be.eql(true);
                res.body.message.should.be.eql("User created Sucessfully");
                res.body.should.have.property("user");
                res.body.token.should.exist;
                testTokenUser1 = res.body.token;
            });

        user.email = "chiku@gmail.com"; // second user for test
        chai.request(app)
            .post("/api/v1/user/register")
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.status.should.be.eql(true);
                res.body.message.should.be.eql("User created Sucessfully");
                res.body.should.have.property("user");
                res.body.token.should.exist;
                testTokenUser2 = res.body.token;
                done();
            });
    });

    //Create Task API

    describe("POST api/v1/tasks", () => {
        const task = {
            title: "task 1",
            description: "description",
        };
        it("Should Create Task", (done) => {
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${testTokenUser1}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201);
                    taskID = res.body.task._id;
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("Should Create Not Create  Task if User is not Authorized ", (done) => {
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer akdjask`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    // GET all Task API

    describe("GET api/v1/tasks", () => {
        it("Should Get All Task", (done) => {
            chai.request(app)
                .get("/api/v1/tasks")
                .set("Authorization", `Bearer ${testTokenUser1}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("tasks");
                    done();
                });
        });

        it("Should  Not Get any  Task if User is not Authorized ", (done) => {
            chai.request(app)
                .get("/api/v1/tasks")
                .set("Authorization", `Bearer akdjask`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    // GET Task By ID API

    describe("GET api/v1/tasks/id", () => {
        it("Should Get   Task", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer ${testTokenUser1}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("task");
                    done();
                });
        });

        it("Should   Not Get any  Task if User is not Authorized ", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer akdjask`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("Should   Not Get any  Task if User is not Same User who created the task ", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer ${testTokenUser2}`)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    // Delete Task API

    describe("DELETE api/v1/tasks/id", () => {
        let id;

        const task = {
            title: "task 1",
            description: "description",
        };
        it("Should Create Task", (done) => {
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", `Bearer ${testTokenUser1}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201);
                    id = res.body.task._id;
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("Should Delete Task", (done) => {
            chai.request(app)
                .delete("/api/v1/tasks/" + id)
                .set("Authorization", `Bearer ${testTokenUser1}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.eql(true);

                    done();
                });
        });

        it("Should   Not Delete any  Task if User is not Authorized ", (done) => {
            chai.request(app)
                .delete("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer akdjask`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("Should   Not Delete any  Task if User is not Same user who created the task ", (done) => {
            chai.request(app)
                .delete("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer ${testTokenUser2}`)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(403);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    // Update Task API

    describe("PATCH api/v1/tasks/id", () => {
        const id = "64a3c84e58990efa1aa34ade";
        const task = {
            title: "task 2",
            description: "description 2",
        };
        it("Should update Task", (done) => {
            chai.request(app)
                .patch("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer ${testTokenUser1}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("updatedTask");
                    res.body.updatedTask.title.should.be.eql("task 2");
                    res.body.updatedTask.description.should.be.eql(
                        "description 2"
                    );
                    done();
                });
        });

        it("Should   Not Update any  Task if User is not Authorized ", (done) => {
            chai.request(app)
                .patch("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer akdjask`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    done();
                });
        });

        it("Should   Not Update any  Task if User is not Same user who created the task ", (done) => {
            chai.request(app)
                .patch("/api/v1/tasks/" + taskID)
                .set("Authorization", `Bearer ${testTokenUser2}`)
                .send(task)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    after(async () => {
        try {
            await Task.deleteMany({});
            await User.deleteMany({});
        } catch (error) {
            console.error(error);
        }
    });
});
