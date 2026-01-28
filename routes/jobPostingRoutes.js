const express = require("express");
const logger = require("../utils/logger");

const passport = require("passport");
const router = express.Router();
const {
  getAllJobPostings,
  getJobPostingById,
  createJobPosting,
  approveJobPosting,
} = require("../controllers/JobPostingController");
// Get all job postings
router.get("/", getAllJobPostings);
// Get job posting by ID
router.get("/:id", getJobPostingById);

router.post("/", createJobPosting);
router.put("/:id/approve", approveJobPosting);

module.exports = router;
