const { Sequelize, sequelize } = require("../../models/index");

const User = require("../../models/user")(sequelize, Sequelize.DataTypes);
const UserStats = require("../../models/user-stats")(
  sequelize,
  Sequelize.DataTypes
);
const UserActivity = require("../../models/user-activity")(
  sequelize,
  Sequelize.DataTypes
);

const handleUserRegister = async (admin, userData) => {
  let newUser = await User.create(userData);

  await admin.auth().updateUser(userData.firebase_uid, {
    displayName: [newUser.first_name, newUser.last_name].join(" "),
  });

  await UserStats.create({
    user_id: newUser.id,
    login_count: 0,
    last_login_date: null,
  });

  return newUser;
};

const handleUserLogin = async (userData) => {
  const stats = await UserStats.findOne({ where: { user_id: userData.id } });

  await UserActivity.create({
    user_id: userData.id,
    login_timestamp: new Date(),
  });

  await UserStats.update(
    {
      login_count: stats.login_count + 1,
      last_login_date: new Date(),
    },
    {
      where: {
        user_id: userData.id,
      },
    }
  );
};

const handleUserLogout = async (userId) => {
  const stats = await UserStats.findOne({ where: { user_id: userId } });

  await UserActivity.update(
    {
      logout_timestamp: new Date(),
    },
    {
      where: {
        user_id: userId,
        login_timestamp: stats.last_login_date,
      },
    }
  );
};

module.exports = { handleUserRegister, handleUserLogin, handleUserLogout };
