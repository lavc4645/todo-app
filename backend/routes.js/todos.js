const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  // console.log("***",todos.length)
  if (todos.length == 0) {
    await seed();
  }
  res.json(todos);
});

// Toggle done status
router.put("/:id", async (req, res) => {
  const { done } = req.body;
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { done },
    { new: true }
  );
  res.json(updated);
});

// Delete todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
const seed = async () => {
  const sampleTodos = [
    { title: "Buy groceries", done: false },
    { title: "Walk the dog", done: true },
    { title: "Write blog post", done: false },
    { title: "Read a book", done: false },
    { title: "Clean the kitchen", done: true },
  ];

  try {
    // await Todo.deleteMany(); // optional: clear existing todos
    const inserted = await Todo.insertMany(sampleTodos);
    console.log("seeding done");
    // res.json({ success: true, data: inserted });
  } catch (err) {
    console.error("seeding", err);
    // res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = router;
