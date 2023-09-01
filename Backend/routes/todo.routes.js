const { Todo } = require("../models/todo.model");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const todos = new Todo({ title });
    const savedTask = await todos.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const { title } = req.body;
  try {
    const task = await Todo.findByIdAndUpdate(taskId, { title }, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(task);
  } catch (error) {
    console.error("Error updating task by ID:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Todo.findByIdAndRemove(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting task by ID:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports ={ router};
