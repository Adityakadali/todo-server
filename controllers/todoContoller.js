const { TodoModel } = require("../models/todo");

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
// Fetches all Todos in DB
const getTodos = async (req, res) => {
  const todos = await TodoModel.find();
  res.status(200).json(todos);
};

// Method Get
// Fetched model by id
const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).send("id not found");
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).send("ID not found");
  }
};

const createTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todo = await TodoModel.findById(id);
  todo.tasks.push(task);
  await todo.save();
  res.status(200).json(todo);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { key } = req.body;
  const todo = await TodoModel.findById(id);
  todo.tasks.splice(key, 1);
  todo.save();
  res.status(200).json(todo);
};

module.exports = {
  getTodos,
  addTodo,
  getTodo,
  deleteTodo,
  createTask,
  deleteTask,
};
