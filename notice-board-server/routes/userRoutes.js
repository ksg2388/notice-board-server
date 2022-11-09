const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
// .patch(verifyJWT, userController.updateUser);
//   .delete(userController.deleteUser);

// router.use(verifyJWT);

// router
//   .route("/")

module.exports = router;
