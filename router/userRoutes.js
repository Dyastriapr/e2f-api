const express = require("express");
const router = express.Router();
const userController = require("../controllers/UsersController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/index", verifyToken, userController.getUsers);
router.post("/register", userController.Register);
router.post("/login", userController.Login);
router.get("/token", userController.refreshToken);
router.delete("/logout", userController.Logout);

module.exports = router;
