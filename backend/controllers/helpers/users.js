const { Sequelize, sequelize } = require("../../models/index");

const User = require("../../models/user")(sequelize, Sequelize.DataTypes);

const handleGetUsers = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch (err) {
    return err;
  }
};

const handleGetUserByUID = async (uid) => {
  try {
    const user = await User.findOne({ where: { firebase_uid: uid } });

    return user;
  } catch (err) {
    return err;
  }
};

module.exports = { handleGetUsers, handleGetUserByUID };
