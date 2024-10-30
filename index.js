const express = require("express");
const app = express();
const port = 3000;
const db = require("./models/index.js");

app.get("/", (req, res) => {
  db.sequelize.authenticate().then(() => {
    res.send("Hello World!");
    console.log("database connected");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
