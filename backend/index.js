const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const { checkDatabaseConnection } = require("./config/database.js");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

(async () => {
  await checkDatabaseConnection();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
