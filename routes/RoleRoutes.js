const express = require("express");
const {
  GetRole,
  CreateRole,
  DeleteRole,
  UpdateRole,
} = require("../controller/RoleControlller");
const router = express.Router();

router.get("/", GetRole);
router.post("/", CreateRole);
router.delete("/:role_name", DeleteRole);
router.put("/:role_name", UpdateRole);

module.exports = router;
