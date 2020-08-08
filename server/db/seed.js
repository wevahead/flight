const {
    client,
    getAllUsers,
    createUser,
} = require("./index");

async function dropTables() {
    try {
        console.log('Starting to drop tables...');

        await client.query(`
            DROP TABLE IF EXISTS users;
        `);

        console.log('Done dropping tables...');
    } catch(error) {
        throw error;
    }
};

async function createTables() {
    try {
        console.log('Starting to create tables...');

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                firstName varchar(255) NOT NULL,
                lastName varchar(255) NOT NULL,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL,
                email varchar(255) UNIQUE NOT NULL
            );
        `);

        console.log('Done creating tables...');
    } catch(error) {
        throw error;
    }
};

async function createInitialUsers() {
    try {
        console.log('Creating users...');

        await createUser({firstName: 'Kevin', lastName: 'Hassenkamp', username: 'kevin123', password: 'pa$$word', email: 'khassenkamp@gmail.com'});
        await createUser({firstName: 'Zeus', lastName: 'Dog', username: 'zeusDog', password: 'pa$$word', email: 'zeusiscool@dogmail.com'});
        await createUser({firstName: 'Shooter', lastName: 'McGavin', username: 'shootah', password: 'pa$$word', email: 'ihatehappy@gmail.com'});

        console.log('Done creating users...');
    } catch(error) {
        throw error;
    }
}




async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch(error) {
        console.error(error);
    }
}

async function testDB() {
    try {

        const users = await getAllUsers();

        console.log(users);
    } catch(error) {
        console.error(error);
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
