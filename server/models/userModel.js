const pool = require("../config/db");

const createUser = async (username, password, age, gender) => {
  const result = await pool.query(
    "INSERT INTO users (username, password, age, gender) VALUES ($1,$2,$3,$4) RETURNING *",
    [username, password, age, gender]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByUsername };