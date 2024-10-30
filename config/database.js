const { sequelize } = require("../models/index.js");

async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();

    console.log("database connected");
  } catch (err) {
    console.error("database not connected", err);
    process.exit(1);
  }
}

module.exports = { checkDatabaseConnection };
