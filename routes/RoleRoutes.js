const express = require("express");
const {
  GetRole,
  CreateRole,
  DeleteRole,
  UpdateRole,
} = require("../controller/RoleControlller");
const { AdminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/", AdminMiddleware, GetRole);
router.post("/", AdminMiddleware, CreateRole);
router.delete("/:role_name", AdminMiddleware, DeleteRole);
router.put("/:role_name", AdminMiddleware, UpdateRole);

module.exports = router;
