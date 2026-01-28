const express = require("express");
const axios = require("axios");
const app = express();
// Load environment variables
require("./loadEnv");

const userRoutes = require("./routes/usersRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const roleRoutes = require("./routes/roleRoutes");
const JobPostingRoutes = require("./routes/jobPostingRoutes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/jobpostings", JobPostingRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("App running in port: " + PORT);
});
