const admin = require("../config/firebase");
const { Sequelize, sequelize } = require("../models/index");

const User = require("../models/user")(sequelize, Sequelize.DataTypes);

const checkEmailMiddleware = async (req, res, next) => {
  try {
    const firebaseUserData = await admin.auth().getUser(req.params.uid);
    const userData = await User.findOne({
      where: { firebase_uid: req.params.uid },
    });

    const { emailVerified } = firebaseUserData;
    const { email_verified } = userData;

    if (emailVerified && !email_verified) {
      await User.update({
        email_verified: true,
      });
    }

    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = checkEmailMiddleware;
