const express = require("express");
const logger = require("../utils/logger");

const passport = require("passport");
const router = express.Router();
const {
  getAllJobPostings,
  getJobPostingById,
  createJobPosting,
  approveJobPosting,
  closeJobPosting,
  archiveJobPosting,
} = require("../controllers/JobPostingController");
// Get all job postings
router.get("/", getAllJobPostings);
// Get job posting by ID
router.get("/:id", getJobPostingById);

router.post("/", createJobPosting);
router.put("/:id/approve", approveJobPosting);
router.put("/:id/close", closeJobPosting);
router.put("/:id/archive", archiveJobPosting);

module.exports = router;
