const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path"); // Import the path module

const { isEmpty } = require("../utils/utils");
const logger = require("../utils/logger");
const pool = require("../db");

const createAdminUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if ([email, password, name].some(isEmpty)) {
      logger.error({
        data: {
          status: 500,
          traceToken: req.traceToken,
          apiAction: "CREATE_ADMIN_USER",
          apiEndpoint: req.originalUrl,
          method: req.method,
          mess: "EMAIL, PASSWORD AND NAME FIELDS REQUIRED",
        },
      });
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "CREATE_ADMIN_USER",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const createEmployeeUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if ([email, password, name].some(isEmpty)) {
      logger.error({
        data: {
          status: 500,
          traceToken: req.traceToken,
          apiAction: "CREATE_EMPLOYEE_USER",
          apiEndpoint: req.originalUrl,
          method: req.method,
          mess: "EMAIL, PASSWORD AND NAME FIELDS REQUIRED",
        },
      });
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "CREATE_EMPLOYEE_USER",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_ALL_EMPLOYEES",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Other user functions remain unchanged
module.exports = {
  createAdminUser,
  getAllEmployees,
};
