const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, createUser, updateUser, getUserById } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users
  });
});

usersRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: `No user found with Id: ${userId}`
      });
    }

    res.send({
      user
    });
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
