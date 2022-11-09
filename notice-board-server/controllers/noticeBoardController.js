const NoticeBoard = require("../models/noticeBoard");
const asyncHandler = require("express-async-handler");

// @desc Get all post
// @route GET /post
// @access Private
const getAllPost = asyncHandler(async (req, res) => {
  const posts = await NoticeBoard.find().select("-_id").lean();
  if (!posts?.length) {
    return res.status(400).json({ message: "No Posts found" });
  }
  res.json(posts);
});

// @desc Create new post
// @route POST /post
// @access Private
const createNewPost = asyncHandler(async (req, res, ctx) => {
  const { title, content, category } = req.body;

  //Confirm data
  if (!title || !content || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const postObject = {
    title,
    content,
    category,
    user: {
      id: req.id,
      username: req.username,
    },
  };

  //Create and store new post
  const post = await NoticeBoard.create(postObject);

  if (post) {
    //created
    res.status(201).json({ message: `New post ${title} create` });
  } else {
    res.status(400).json({ message: "Invalid post data received" });
  }
});

// @desc Delete post
// @route DELETE /post
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "POST ID Required" });
  }

  const post = await NoticeBoard.findById(_id).exec();

  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }

  const result = await post.deleteOne();

  const reply = `Post ${result.title} deleted`;

  res.json(reply);
});

module.exports = {
  getAllPost,
  createNewPost,
  deletePost,
};
