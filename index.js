// index.js
// where your node app starts

import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path"; // Import the 'path' module
import { dirname } from "path";
import { fileURLToPath } from "url";
import UAParser from "ua-parser-js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// Set the 'public' folder as the location for serving static files
app.use(express.static(path.join(__dirname, "public")));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use((req, res, next) => {
  // You can set your preferred language here
  const preferredLanguage = "English"; // Replace with your preferred language
  // Define your software stack information
  const softwareInfo = {
    javascript: true,
  };
  req.softwareInfo = softwareInfo;
  req.preferredLanguage = preferredLanguage;
  req.softwareInfo = req.get("User-Agent");
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.preferredLanguage,
    software: req.softwareInfo,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
