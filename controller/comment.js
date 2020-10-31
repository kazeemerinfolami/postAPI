const Post = require("../models/post");
const Comment = require("../models/comment");

exports.createComment = (req, res)=> {
const comment = new Comment();
comment.content = req.body.content;
comment.post = req.params.postId
comment.save((error, data) => {
    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
    res.json(data);
});
}


exports.readComments = (req, res)=> {
    const postId = req.params.postId;
    const post = Post.findById(postId)
    // console.log(post._conditions._id, "postidfromdb", postId);
    if (post._conditions._id == postId){
      Comment.find()
      .populate("post", "_id user title content")
      .sort("-created")
      .where({postId : post._id})
      .exec((err, data) => {
          if (err) {
              return res.status(400).json({
                  error: err.message,
              });
          }
          res.json(data);
      });
    }
    // Comment.findById(req.params.postId, function (err, data) {
    //     if (err) return next(err);
    //     res.json(data);
    //   })
    //     .populate("Post")
    //     // .populate("content");

//     const postId = req.params.postId;
//     console.log(postId);
//       Post.findById(postId)
//       .populate("comments", "content")
//       .sort("-created")
//   .exec((err, data) => {
//     if (err || !data) {
//       return res.status(400).json({
//         error: "Post not found",
//       });
//     }
//     res.json(data);
//   });
        
}

exports.removeComment = (req, res)=> {
    const commentId = req.params.commentId;
    console.log(commentId);
    Comment.findById(commentId).exec((err, data) => {
      if (err || !data) {
        return res.status(400).json({
          error: "Comment not found",
        });
      }
      data.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Comment not found'
        })
      }
      res.json({
        message: 'Comment deleted successfully'
      })
    })
    });
}