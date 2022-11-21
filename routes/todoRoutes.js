const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  getTodo,
  deleteTodo,
  createTask,
  deleteTask,
} = require("../controllers/todoContoller");

router.get("/todo", getTodos);

router.post("/todo", addTodo);

router.get("/todo/:id", getTodo);

router.get("/todo/delete/:id", deleteTodo);

router.get("/todo/edittask/:id", createTask);

router.get("/todo/deletetask/:id", deleteTask);

module.exports = { router };
