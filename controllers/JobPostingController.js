// const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path"); // Import the path module
const { isEmpty } = require("../utils/utils");
const { log } = require("console");
const pool = require("../db");

const getAllJobPostings = async (req, res) => {
  try {
    // Logic to get all job postings from the database
    res.status(200).json({ success: true, data: { mess: "Gots all posts" } }); // Placeholder response
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_ALL_JOB_POSTINGS",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getJobPostingById = async (req, res) => {
  try {
    const { id } = req.params;
    // Logic to get a job posting by ID from the database
    res
      .status(200)
      .json({ success: true, data: { mess: `Got post with id: ${id}` } }); // Placeholder response
  } catch (error) {
    logger.error({
      data: {
        status: 500,
        traceToken: req.traceToken,
        apiAction: "GET_JOB_POSTING_BY_ID",
        apiEndpoint: req.originalUrl,
        method: req.method,
        mess: error.message,
      },
    });
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// hr approve job posting
const approveJobPosting = async (req, res) => {
  try {
    const { id } = req.params;
    // Logic to approve a job posting by ID in the database

    //userid for audit trail can be obtained from req.user if using authentication middleware but for now will be 1 as the system user as there is no auth implemented yet
    const approved_by = 1;

    // better to do update and set approved=true rather than select then update for concurrency
    const query = `UPDATE job_postings
      SET 
        approved_by = $2,
        posted_at = NOW(),
        status = 'open',
        updated_at = NOW()
      WHERE id = $1 AND status = 'draft'
      RETURNING *;`;

    const approve_values = [id, approved_by];

    const { rows } = await pool.query(query, approve_values);

    if (rows.length) {
      return res.status(200).json({ success: true, data: rows[0] }); // Placeholder response
    }

    // If no rows were updated, check if the job posting exists and its status is open
    const check = await pool.query(
      "SELECT status FROM job_postings WHERE id=$1",
      [id],
    );

    if (!check.rows.length) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    return res.status(400).json({
      message: `Job posting already ${check.rows[0].status}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createJobPosting = async (req, res) => {
  let {
    title,
    description,
    location,
    employment_type,
    role_id,
    department_id,
    salary_min,
    salary_max,
    created_by,
  } = req.body;
  try {
    if (
      [
        title,
        description,
        location,
        department_id,
        role_id,
        employment_type,
        salary_min,
        salary_max,
        created_by,
      ].some(isEmpty)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    // Logic to create a new job posting in the database
    const query = `
  INSERT INTO job_postings (
    title,
    description,
    location,
    employment_type,
    department_id,
    role_id,
    salary_min,
    salary_max,
    created_by
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  RETURNING *;
`;

    const values = [
      title,
      description,
      location,
      employment_type,
      department_id,
      role_id,
      salary_min,
      salary_max,
      created_by,
    ];

    console.log(query);

    const { rows } = await pool.query(query, values);

    res.status(201).json({ success: true, data: rows[0] }); // Placeholder response
  } catch (error) {
    // logger.error({
    //   data: {
    //     status: 500,
    //     traceToken: req.traceToken,
    //     apiAction: "CREATE_JOB_POSTING",
    //     apiEndpoint: req.originalUrl,
    //     method: req.method,
    //     mess: error.message,
    //   },
    // });

    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  getAllJobPostings,
  getJobPostingById,
  createJobPosting,
  approveJobPosting,
};
