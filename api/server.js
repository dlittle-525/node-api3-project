const express = require('express');
const logger = require("./middleware")
const userRouter = require("./users/users-router")

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
server.use(logger())
server.use(userRouter)

server.use((err,req, res, next) => {
  console.log(err)

  res.status(500).json({
    message: "Something went horribly wrong",
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
