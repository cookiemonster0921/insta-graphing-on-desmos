// Import required modules
const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("qs");

// Initialize the Express application
const app = express();

// Define a port
const PORT = process.env.PORT || 3000;

const cookie = process.env['cookie']
const xtoken = process.env['xctoken']

// Middleware to serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample API route
app.post("/api", (req, res) => {
  console.log(req.body)
  console.log(req.body.username)
  let data = qs.stringify({
    variables:
      `{"data":{"count":1200,"include_relationship_info":true,"latest_besties_reel_media":true,"latest_reel_media":true},"username":"${req.body.username}","__relay_internal__pv__PolarisShareMenurelayprovider":false}`,
    doc_id: "9195084877213487",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.instagram.com/api/graphql",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:cookie ,
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0(Macintosh;IntelMacOSX10_15_7)AppleWebKit/537.36(KHTMLlikeGecko)Chrome/123.0.0.0Safari/537.36",
      "X-Asbd-Id": "129477",
      "X-Bloks-Version-Id":
        "8cfdad7160042d1ecf8a994bb406cbfffb9a769a304d39560d6486a34ea8a53e",
      "X-Csrftoken": xtoken,
      "X-Fb-Friendly-Name": "PolarisUserHoverCardContentV2Query",
      "X-Fb-Lsd": "",
      "X-Ig-App-Id": "", //add your own value
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      console.log(response.status)
      res.status(203).send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});

// Fallback route for serving the main HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
