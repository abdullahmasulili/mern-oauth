const express = require("express");
const app = express();
const port = 3000;

const { checkDatabaseConnection } = require("./config/database.js");
const authRoute = require("./routes/auth.js");

app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

(async () => {
  await checkDatabaseConnection();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
