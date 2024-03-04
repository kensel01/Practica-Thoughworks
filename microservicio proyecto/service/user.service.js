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
  getAllUsers: async () => {
    const result = await pool.query("SELECT * FROM Users");
    return result.rows;
  },
  getUser: async (user_id) => {
    const result = await pool.query("SELECT * FROM Users WHERE user_id = $1", [user_id]);
    return result.rows[0];
  },

  updateUser: async (user_id, userData) => {
    const { user_name, user_password, email } = userData;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const result = await pool.query(
      "UPDATE Users SET user_name = $2, user_password = $3, email = $4 WHERE user_id = $1 RETURNING *",
      [user_id, user_name, hashedPassword, email]
    );
    return result.rows[0];
  },
};

module.exports = UserService;
