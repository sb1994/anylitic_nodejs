const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { isEmpty } = require("../utils/utils");
const logger = require("../utils/logger");
const pool = require("../db");

const getAllDepartments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departments");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_ALL_DEPARTMENTS",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getDepartmentById = async (req, res) => {
  let { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM departments WHERE id = $1", [
      id,
    ]);

    console.log(result.rows[0]);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_DEPARTMENTS_BY_ID",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const getRolesByDepartmentID = async (req, res) => {
  let { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT
  r.id AS role_id,
  r.name AS role_name,
  r.department_id,
  d.id AS department_id,
  d.name AS department_name,
  d.description
FROM roles r
JOIN departments d ON r.department_id = d.id
WHERE r.department_id = $1;
`,
      [id]
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_DEPARTMENTS_BY_ID",
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
  getAllDepartments,
  getDepartmentById,
  getRolesByDepartmentID,
};
