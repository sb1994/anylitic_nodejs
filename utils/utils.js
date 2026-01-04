const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const getEntraAccessToken = async () => {
  const tokenUrl = `https://login.microsoftonline.com/${process.env.ENTRA_TENANT_ID}/oauth2/v2.0/token`;

  try {
    let response = await axios.post(
      tokenUrl,
      {
        client_id: process.env.ENTRA_CLIENT_ID,
        client_secret: process.env.ENTRA_CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        timeout: 10000, // 10 seconds
      }
    );

    console.log(response.data); // JWT token

    let { data } = response;

    return data;
  } catch (err) {
    console.error("Error getting access token", err.response?.data || err);
    throw err;
  }
};
const traceMiddleware = (req, res, next) => {
  // Generate a new unique trace token for each request
  const traceToken = uuidv4();

  req.traceToken = traceToken; // Attach to request object

  // Set trace token in response headers for debugging & tracing across services
  res.setHeader("X-Trace-Token", traceToken);

  next();
};

const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
};

module.exports = {
  isEmpty,
  traceMiddleware,
  getEntraAccessToken,
};
