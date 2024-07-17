const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    user: {
      type: ObjectId,
      require: true,
      ref:"user"
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
