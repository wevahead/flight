const { client } = require('./client');

async function getAllUsers() {
    const { rows } = await client.query(`
        SELECT *
        FROM users;
    `);

    return rows;
};

async function createUser({firstName, lastName, username, password, email}) {
    try {
        const { rows } = await client.query(`
            INSERT INTO users (firstName, lastName, username, password, email)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `, [firstName, lastName, username, password, email]);

        return rows;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getAllUsers,
    createUser,
}