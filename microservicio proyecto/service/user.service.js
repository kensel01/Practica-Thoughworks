const pool = require("../db");
const bcrypt = require("bcrypt");

const UserService = {
  createUser: async (user_name, user_password, email) => {
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const result = await pool.query(
      "INSERT INTO Users (user_name, user_password, email) VALUES ($1, $2, $3) RETURNING *",
      [user_name, hashedPassword, email]
    );
    return result.rows[0];
  },
  findUserByName: async (email) => {
    const result = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },
  getAllUser: async () => {
    const result = await pool.query("SELECT * FROM Users");
    return result.rows;
  },

  updateUser: async (user_id, user_name, user_password, email) => {
    const result = await pool.query(
      "UPDATE Users SET user_name =$1, user_password=$2, email=$3 WHERE user_id=$4 RETURNING *",
      [user_id, user_name, user_password, email]
    );
    return result.rows[0];
  },
};

module.exports = UserService;
