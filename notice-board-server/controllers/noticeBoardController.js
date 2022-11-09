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

// @desc Get 페이지별 post
// @route GET /post/:perPage/:maxPage
// @access Private
const getPost = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  console.log(req.query);

  const total = await NoticeBoard.countDocuments({}); // 총 게시글 수 세기
  const posts = await NoticeBoard.find({})
    .sort({ createdAt: -1 }) // 생성한 시간을 역순으로 정렬
    .skip(perPage * (page - 1)) // 검색 시 포함하지 않을 데이터 수
    .limit(perPage); // 검색 결과 수 제한
  const totalPage = Math.ceil(total / perPage);

  if (!posts?.length) {
    return res.status(400).json({ message: "No Posts found" });
  }

  res.json({
    posts: posts,
    currentPage: page,
    maxPage: totalPage,
  });
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
  getPost,
};
