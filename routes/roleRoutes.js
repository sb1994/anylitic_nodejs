const express = require("express");
const logger = require("../utils/logger");

const passport = require("passport");
const { getAllRoles, getRoleById } = require("../controllers/roleController");
const router = express.Router();

//login user
// router.post("/login", loginUser);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);

module.exports = router;
