import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./helper/db.js";
import todoRouter from "./routers/todoRouter.js";

dotenv.config();

const env = process.env.NODE_ENV;
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", todoRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status: status,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
