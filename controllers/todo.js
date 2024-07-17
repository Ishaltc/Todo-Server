const Todo = require("../models/Todo");

/*CREATE*/
exports.createTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if ((!id, !name)) {
      return res.status(400).json({ message: "Missing required parameter" });
    }

    const newTodo = await new Todo({
      name,
      user: id,
    }).save();

    const findTodo = await Todo.find({ user: id }).sort({ _id: -1 });
    return res.status(200).json({
      message: "Todo created successfully",
      data: findTodo,
      success: 1,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*UPDATE*/
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Missing required parameter" });
    }

    const existingTodo = await Todo.findById(id);
    if (!existingTodo)
      return res.status(200).json({ message: "Todo not found", success: 0 });

    existingTodo.name = name;
    let updatedTodo = await existingTodo.save();

    return res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
      success: 1,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*READ*/
exports.myTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing required parameter" });
    }
    const findTodo = await Todo.find({ user: id }).sort({ _id: -1 });
    if (findTodo.length) {
      return res.status(200).json({
        message: "Todo retrieved successfully",
        data: findTodo,
        success: 1,
      });
    } else {
      return res.status(200).json({
        message: "Todo not found",
        data: [],
        success: 0,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*DELETE*/
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing required parameter" });
    }

    const existingTodo = await Todo.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Todo deleted successfully", success: 1 });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
