const express = require("express");
const router = express.Router();


const { requireSignIn } = require("../controller/auth");
const { createComment, readComments, removeComment } = require("../controller/comment");

router.post("/post/:postId/comment", requireSignIn, createComment);
router.get("/:postId/comment", requireSignIn, readComments);
router.delete("/comment/:commentId", requireSignIn, removeComment );

module.exports = router;
