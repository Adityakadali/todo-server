const { TodoModel } = require("../models/todo");
exports.getTodos = async (req, res) => {
  res.status(200).json({
    message: "working route",
  });
};

// module.exports = { getTodos };
