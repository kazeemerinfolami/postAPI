const express = require("express");
const router = express.Router();

const { requireSignIn } = require("../controller/auth");
const {
  createPost,
  removePost,
  getPost,
  getAllPost,
} = require("../controller/post");

router.post("/post/:id", requireSignIn, createPost);
router.get("/post/:postId", requireSignIn, getPost);
router.get("/posts", getAllPost);
router.delete("/post/:id", requireSignIn, removePost);

module.exports = router;
