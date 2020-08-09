const PORT = 3000;
const express = require("express");
const { client } = require('./db');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api');

client.connect();

server.listen(PORT, () => {
  console.log("Server is up on port", PORT);
});

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api', apiRouter);

server.get("/health", (req, res, next) => {
  res.send({
    message: "Server is healthy"
  });
});
