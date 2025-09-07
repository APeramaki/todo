import { pool } from "../helper/db.js";

const addUser = async (email, hashedPassword) => {
  return await pool.query(
    "INSERT INTO accounts (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
  );
};

const getUser = async (email) => {
  return await pool.query("SELECT * FROM accounts WHERE email = $1", [email]);
};

export { addUser, getUser };
