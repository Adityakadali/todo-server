const { TodoModel } = require("../models/todo");

// Method GET
// Fetches all Todos in DB
const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(503).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

// Method POST
// Adds todo Entry to DB
const addTodo = async (req, res) => {
  const { title, task } = req.body;
  if (!title) {
    return res.status(401).json({
      staus: "401",
      message: "Title cannot be empty",
    });
  }
  try {
    const todo = new TodoModel({
      title: title,
    });

    if (task) {
      await todo.tasks.push(task);
    }
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(503).json({
      status: "503",
      message: "Internal server error",
      erorr: error,
    });
  }
};

// Method GET
// Deletes todo
// From body => id
const deleteTodo = async (req, res) => {
  const { id } = req.body;
  const todo = await TodoModel.findByIdAndDelete(id).exec();
  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "Invalid id",
    });
  }
  res.status(200).json({
    status: 200,
    message: "Deleted",
    todo: todo,
  });
};

const editTodo = async (req, res) => {
  const { id, newTitle } = req.body;
  const todo = await TodoModel.findById(id).exec();
  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "Invalid id",
    });
  }

  todo.title = newTitle;
  await todo.save();
  res.status(200).json(todo);
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
};
