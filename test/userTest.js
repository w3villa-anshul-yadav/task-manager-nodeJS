 
const mongoose = require("mongoose");
const User = require("../models/User");
const app = require("../app");

const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

chai.use(chaiHttp);

describe("-------------------User API------------------", () => {
    describe("POST /api/v1/user/register ", () => {
        const user = {
            email: "chikuTest@gmail.com",
            password: "Chiku@123",
            confirmPassword: "Chiku@123",
            phoneNumber: "9932232423",
        };

        it("should Not create User if Name is not provided", (done) => {
            chai.request(app)
                .post("/api/v1/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should Not create User if email is not provided", (done) => {
            user.name = "anshuly";
            user.email = "";

            chai.request(app)
                .post("/api/v1/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should Not create User if Phone Number is not provided", (done) => {
            user.email = "chikuTest@gmail.com";
            user.phoneNumber = "";
            chai.request(app)
                .post("/api/v1/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should Not create User if Password is not provided", (done) => {
            user.phoneNumber = "9932232423";
            user.password = "";

            chai.request(app)
                .post("/api/v1/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should Not create User if Confirm Password is not provided", (done) => {
            user.password = "Chiku@123";
            user.confirmPassword = "";

            chai.request(app)
                .post("/api/v1/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should   Create User ", (done) => {
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
                    done();
                });
        });
    });

    describe("POST /api/v1/user/login", () => {
        const user = {
            password: "Chiku@123",
        };

        it("should Not Login User if email is not provided", (done) => {
            chai.request(app)
                .post("/api/v1/user/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should Not login User if Password is not provided", (done) => {
            user.email = "chikuTest@gmail.com";
            user.password = "";

            chai.request(app)
                .post("/api/v1/user/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should   Login User ", (done) => {
            const user = {
                email: "chikuTest@gmail.com",
                password: "Chiku@123",
            };

            chai.request(app)
                .post("/api/v1/user/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.eql(true);
                    res.body.should.have.property("user");
                    res.body.token.should.exist;
                    done();
                });
        });

        after(async () => {
            try {
                await User.deleteMany({});
            } catch (error) {
                console.error(error);
            }
        });
    });
});
