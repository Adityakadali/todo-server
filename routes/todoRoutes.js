const express = require("express");
const router = express.Router();
const { getTodos } = require("../controllers/todoContoller");

// router.get("/", getTodos);

router.route("/").get(getTodos);

module.exports = { router };
