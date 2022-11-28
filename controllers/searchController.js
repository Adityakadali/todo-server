const { TodoModel } = require("../models/todo");

const searchControl = async (req, res) => {
  try {
    const { query } = req.body;
    const s = await TodoModel.aggregate().search({
      index: "default",
      text: {
        query: query,
        path: ["title", "tasks"],
      },
    });
    res.status(200).json(s);
  } catch (error) {
    res.status(503).json({
      status: 503,
      error: error,
    });
  }
};

module.exports = { searchControl };
