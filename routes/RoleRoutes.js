const express = require("express");
const { GetRole, CreateRole } = require("../config/RoleControlller");
const router = express.Router();

router.get("/", GetRole);
router.post("/", CreateRole);

module.exports = router;
