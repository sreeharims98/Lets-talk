require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is the server");
});

app.listen(5000, () => console.log("server connected"));
