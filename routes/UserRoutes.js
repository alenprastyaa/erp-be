const express = require("express");
const {
  GetAllUser,
  CreateUser,
  Login,
} = require("../controller/UserController");
const router = express.Router();

router.get("/", GetAllUser);
router.post("/", CreateUser);
router.post("/login", Login);

module.exports = router;
