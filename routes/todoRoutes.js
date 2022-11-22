const express = require("express");
const todo = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoContoller");

todo.route("/").get(getTodos).post(addTodo).delete(deleteTodo);

module.exports = { todo };
