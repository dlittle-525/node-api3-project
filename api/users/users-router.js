const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const users = require("./users-model");
const posts = require("../posts/posts-model");

// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware");

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users.get()
    .then((users) => {
      res.status(200).json([users])
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.json(req.user)
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    }).catch(next)
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch(next)
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
    users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(req.user)
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch(next)
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch(next)
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  posts.addUserPost(req.params.is, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch(next)
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router