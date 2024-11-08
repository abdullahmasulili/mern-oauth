const admin = require("../config/firebase");
const { Sequelize, sequelize } = require("../models/index");

const User = require("../models/user")(sequelize, Sequelize.DataTypes);

const {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleSendEmailVerificationLink,
} = require("./helpers/auth");

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

      user = await handleUserRegister(admin, newUser);
      await handleSendEmailVerificationLink(admin, email);
    } else {
      await handleUserLogin(user);
    }

    res.status(201).json({
      message: "Authentication succeed",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await handleUserLogout(req.body.userId);
    res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const result = await handleSendEmailVerificationLink(admin, req.body.email);

    res.status(200).json({
      ...result,
      message: `Verification link has sent to ${req.body.email}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { authenticateUser, logoutUser, verifyEmail };
