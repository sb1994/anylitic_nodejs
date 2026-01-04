const express = require("express");

const {
  getAllDepartments,
  getDepartmentById,
  get,
  getRolesByDepartmentID,
} = require("../controllers/departmentController");
const router = express.Router();

//login user
// router.post("/login", loginUser);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);
router.get("/:id/roles", getRolesByDepartmentID);

module.exports = router;
