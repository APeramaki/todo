import pkg from "pg";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";

dotenv.config();

const port = process.env.port;

const { Pool } = pkg;
const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database:
      env === "test"
        ? process.env.TEST_DB_NAME || "test_todo"
        : process.env.DB_NAME || "todo",
    password: process.env.DB_PASSWORD || "password",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  });
  console.log(
    `Connected to database: ${pool.options.database} on port ${pool.options.port}`
  );

  return pool;
};

const pool = openDb();
export { pool };
