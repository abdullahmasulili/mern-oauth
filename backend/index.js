const express = require("express");
const app = express();
const port = 3000;
const { checkDatabaseConnection } = require("./config/database.js");

app.use("/api", auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

(async () => {
  await checkDatabaseConnection();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
