import { pool } from "../helper/db.js";
import { Router } from "express";
import { auth } from "../helper/auth.js";
const todoRouter = Router();

todoRouter.get("/", (req, res, next) => {
  pool.query("SELECT * FROM tasks ORDER BY id ASC", (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result.rows);
  });
});

todoRouter.post("/create", auth, (req, res, next) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  pool.query(
    "INSERT INTO tasks (description) VALUES ($1) RETURNING *",
    [task.description],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res
        .status(201)
        .json({ id: result.rows[0].id, description: task.description });
    }
  );
});

todoRouter.delete("/delete/:id", auth, (req, res, next) => {
  const { id } = req.params;

  console.log(`Deleting task with id: ${id}`);
  pool.query("DELETE FROM tasks WHERE id = $1", [id], (err, result) => {
    if (err) {
      return next(err);
    }
    if (result.rowCount === 0) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json({ id: id });
  });
});

export default todoRouter;
