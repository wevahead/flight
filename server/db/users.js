const { client } = require("./client");

async function getAllUsers() {
  const { rows } = await client.query(`
        SELECT *
        FROM users;
    `);

  return rows;
}

async function createUser({ firstname, lastname, username, password, email }) {
  try {
    const { rows } = await client.query(
      `
            INSERT INTO users (firstname, lastname, username, password, email)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
      [firstname, lastname, username, password, email]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user]
    } = await client.query(
      `
              UPDATE users
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
              `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user]
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id=$1;
            `,
      [userId]
    );

    if (!user) {
      throw {
        error: "UserNotFound",
        description: "Could not find user with given user ID"
      };
    }

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
};
