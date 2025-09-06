import express from "express";
import cors from "cors";
import pkg from "pg";

const port = 3001;
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const openDb = () => {
  const pool = new Pool({
    user: "postgres",
    host: "192.168.1.107",
    database: "todo",
    password: "salasana",
    port: 5435,
  });
  return pool;
};

app.get("/", (req, res) => {
  const pool = openDb();
  pool.query("SELECT * FROM tasks ORDER BY id ASC", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result.rows);
  });
});

app.post("/create", (req, res) => {
  const { task } = req.body;
  const pool = openDb();

  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }

  pool.query(
    "INSERT INTO tasks (task) VALUES ($1) RETURNING *",
    [task.description],
    (err, result) => {
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res
          .status(201)
          .json({ id: result.rows[0].id, description: task.description });
      };
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const pool = openDb();

  console.log(`Deleting task with id: ${id}`);
  pool.query("DELETE FROM tasks WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ id: id });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
