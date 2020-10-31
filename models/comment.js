const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    require: "Comment content is Required",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: "Post is Required",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
