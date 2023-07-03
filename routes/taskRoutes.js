const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    res.status(200).send("all task");
});

route.get("/:id", (req, res) => {
    res.status(200).send(`get task using ${req.params.id}`);
});

route.post("/", (req, res) => {
    res.status(200).send("create new task");
});

route.patch("/:id", (req, res) => {
    res.status(200).send(`update task using ${req.params.id}`);
});

route.delete("/:id", (req, res) => {
    res.status(200).send(`delete task using ${req.params.id}`);
});

module.exports = route;
