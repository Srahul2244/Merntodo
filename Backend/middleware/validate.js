function validateTodo(req, res, next) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Task title cannot be empty." });
  }

  if (title.length > 100) {
    return res.status(400).json({ error: "Task title is too long." });
  }

  next();
}

module.exports = { validateTodo };
