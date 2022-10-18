const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /user
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Create new user
// @route POST /user
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { id, username, password } = req.body;

  //Confirm data
  if (!username || !password || !id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate
  const duplicateUserName = await User.findOne({ username }).lean().exec();
  const duplicateId = await User.findOne({ id }).lean().exec();

  if (duplicateId) {
    return res.status(409).json({ message: "Duplicate ID" });
  }
  if (duplicateUserName) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  //Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { id, username, password: hashedPwd };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

module.exports = {
  getAllUsers,
  createNewUser,
};
