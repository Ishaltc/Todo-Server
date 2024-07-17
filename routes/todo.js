const express = require("express");
const {
  register,
  login,
  sentResetPasswordCode,
  updatePassword,
} = require("../controllers/users");
const {
  createTodo,
  updateTodo,
  myTodo,
  deleteTodo,
} = require("../controllers/todo");
const { authUser } = require("../middleware/auth,js");
const router = express.Router();

// auth apis //
router.post("/api/todos/:id", authUser, createTodo);
router.patch("/api/todos/:id", updateTodo);
router.get("/api/todos/:id", authUser, myTodo);
router.delete("/api/todos/:id", authUser, deleteTodo);

module.exports = router;
