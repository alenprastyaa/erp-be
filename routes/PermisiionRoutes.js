const express = require('express')
const { GetPermissions, GetPermissionById, CreatePermission, DeletePermission, UpdatePermission, CreateEmployeAbsensi, GetMyPermission } = require('../controller/PermissionAbesnController')
const { AuthMiddleare, AdminMiddleware } = require('../middleware/auth')
const router = express.Router()


router.get("/", AdminMiddleware, GetPermissions)
router.get("/:id", AdminMiddleware, GetPermissionById)
router.post("/", AdminMiddleware, CreatePermission)
router.delete("/:id", AdminMiddleware, DeletePermission)
router.put("/:id", AdminMiddleware, UpdatePermission)
router.post("/my/permission", AuthMiddleare, CreateEmployeAbsensi)
router.get("/my/permission", AuthMiddleare, GetMyPermission)



module.exports = router