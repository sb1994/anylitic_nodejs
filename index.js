const express = require("express");
const axios = require("axios");
const app = express();
// Load environment variables
require("./loadEnv");

const pool = require('./db');

app.post("/users", async (req, res) => {


  const tokenUrl = `https://login.microsoftonline.com/${process.env.ENTRA_TENANT_ID}/oauth2/v2.0/token`;



  try {
    let response = await axios.post(tokenUrl,{
      client_id: process.env.ENTRA_CLIENT_ID,
      client_secret: process.env.ENTRA_CLIENT_SECRET,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 10000, // 10 seconds
    });

    console.log(response.data); // JWT token


    let {data} = response;


    res.json({ data });
  } catch (err) {
    console.error('Error getting access token', err.response?.data || err);
    throw err;
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log("App running in port: " + PORT);
});
