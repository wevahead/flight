const { client, getAllUsers, createUser, updateUser, getUserById } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS groups;
        `);

    console.log("Done dropping tables...");
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to create tables...");

    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            firstname varchar(255) NOT NULL,
            lastname varchar(255) NOT NULL,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            email varchar(255) UNIQUE NOT NULL
        );
    `);

    await client.query(`
        CREATE TABLE groups (
            id SERIAL PRIMARY KEY,
            creator_id INTEGER REFERENCES users(id), 
            title varchar(255) NOT NULL,
            description varchar(255) NOT NULL,
            location varchar(255) NOT NULL
        );
    `);

    console.log("Done creating tables...");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Creating users...");

    await createUser({
      firstname: "Kevin",
      lastname: "Hassenkamp",
      username: "kevin123",
      password: "pa$$word",
      email: "khassenkamp@gmail.com"
    });
    await createUser({
      firstname: "Zeus",
      lastname: "Dog",
      username: "zeusDog",
      password: "pa$$word",
      email: "zeusiscool@dogmail.com"
    });
    await createUser({
      firstname: "Shooter",
      lastname: "McGavin",
      username: "shootah",
      password: "pa$$word",
      email: "ihatehappy@gmail.com"
    });

    console.log("Done creating users...");
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    const users = await getAllUsers();
    console.log(users);
    
  } catch (error) {
    console.error(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
