const { TodoModel } = require("../models/todo");

// Method

const createTask = async (req, res) => {
  const { id, task } = req.body;
  if (id || task) {
    return res.status(400).json({
      status: 400,
      message: "Task cannot be empty",
    });
  }

  const todo = await TodoModel.findById(id).exec();

  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "Invalid id",
    });
  }

  todo.tasks.push(task);
  await todo.save();
  res.status(200).json(todo);
};

const deleteTask = async (req, res) => {
  const { id, key } = req.body;
  const todo = await TodoModel.findById(id).exec();

  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "Invalid id",
    });
  }

  todo.tasks.splice(key, 1);
  await todo.save();
  res.status(200).json(todo);
};

const edittask = async (req, res) => {
  const { id, key, newTask } = req.body;
  const todo = await TodoModel.findById(id).exec();

  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "Invalid id",
    });
  }

  todo.tasks[key] = newTask;
  await todo.save();
  res.status(200).json(todo);
};

module.exports = { createTask, deleteTask, edittask };
