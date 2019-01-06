const express = require("express");
// import controller file
const todoController = require("../controllers/todo.server.controller");

// get an instance of express router
const router = express.Router();

router
  .route("/")
  .get(todoController.getTodos)
  .post(todoController.addTodo)
  .put(todoController.updateTodo);

router
  .route("/:id")
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
