// const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path"); // Import the path module

// const { PERMISSIONS } = require("../config/permissions");
const { isEmpty } = require("../utils/utils");
const logger = require("../utils/logger");
const pool = require("../db");

const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_ALL_ROLES",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_ROLE_BY_ID",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
};
