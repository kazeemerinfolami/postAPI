const User = require("../models/user");
const Post = require("../models/post");

exports.createPost = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found. Must be a user before you create a post",
      });
    }

    const post = new Post();
    post.user = userId;
    post.title = req.body.title;
    post.content = req.body.content;
    post.save((err, post) => {
      if (err) {
        console.log("SAVE POST ERROR", err.message);
        return res.status(401).json({
          error: err.message,
        });
      }
      return res.json({
        post,
      });
    });
  });
};

exports.getPost = (req, res) => {
  // Post.find()
  //     .populate("Comment", "_id content")
  //     .sort("-created")
  //     .exec((err, data) => {
  //         if (err) {
  //             return res.status(400).json({
  //                 error: error.message,
  //             });
  //         }
  //         res.json(data);
  //     });
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("comment", "_id content")
    .sort("-created")
    .exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({
          error: "Post not found",
        });
      }
      res.json(data);
    });
  // console.log(req.params.postId);
  //   Post.findById(req.params.postId, function (err, data) {
  //     if (err) return next(err);
  //     res.json(data);
  //   })
  // .populate("Comment")
  // .populate("content");
};
exports.getAllPost = (req, res, next) => {
  Post.find()
    .sort("-created")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: error.message,
        });
      }
      res.json(data);
    });
};

exports.removePost = (req, res) => {
  const postId = req.params.id;
  Post.findById(postId).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: "Post not found",
      });
    }
    data.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Post not found",
        });
      }
      res.json({
        message: "Post deleted successfully",
      });
    });
  });
};
