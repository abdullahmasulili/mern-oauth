const admin = require("../config/firebase");
const { Sequelize, sequelize } = require("../models/index");

const User = require("../models/user")(sequelize, Sequelize.DataTypes);
const UserStats = require("../models/user-stats")(
  sequelize,
  Sequelize.DataTypes
);

const authenticateUser = async (req, res, next) => {
  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.body.firebaseToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ where: { firebase_uid: uid } });

    if (!user) {
      const newUser = {
        firebase_uid: uid,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email,
        sign_up_timestamp: new Date(),
        sign_up_provider: req.body.provider,
      };

      user = await User.create(newUser);
      await admin.auth().updateUser(uid, {
        displayName: [user.first_name, user.last_name].join(" "),
      });
    }

    await UserStats.create({
      user_id: user.id,
      login_count: 0,
      last_login_date: null,
    });

    res.status(201).json({
      message: "Authentication succeed",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateUser };
