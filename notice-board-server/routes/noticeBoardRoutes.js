const express = require("express");
const router = express.Router();
const noticeBoardController = require("../controllers/noticeBoardController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(noticeBoardController.getAllPost)
  .post(noticeBoardController.createNewPost)
  .delete(noticeBoardController.deletePost);
// .patch(userController.updateUser)
// .delete(userController.deleteUser);

module.exports = router;
