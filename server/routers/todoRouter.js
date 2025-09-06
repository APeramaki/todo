import { pool } from "../helper/db.js";
import { Router } from "express";
import { auth } from "../helper/auth.js";
import {
  getTasks,
  postTask,
  deleteTask,
} from "../controllers/TaskController.js";

const todoRouter = Router();

todoRouter.get("/", getTasks);

todoRouter.post("/create", postTask);

todoRouter.delete("/delete/:id", deleteTask);

export default todoRouter;
