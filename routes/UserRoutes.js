const express = require("express");
const {
  GetAllUser,
  CreateUser,
  Login,
} = require("../controller/UserController");
const { AdminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/", AdminMiddleware, GetAllUser);
router.post("/", AdminMiddleware, CreateUser);
router.post("/login", Login);

module.exports = router;
