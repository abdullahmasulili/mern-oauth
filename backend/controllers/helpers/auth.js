require("dotenv").config();
const nodemailer = require("nodemailer");
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

const handleSendEmailVerificationLink = async (admin, email) => {
  try {
    const verificationLink = await admin
      .auth()
      .generateEmailVerificationLink(email);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email for our app",
      text: `Click the link to verify your email: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);

    return Promise.resolve({
      isSent: true,
      message: "Email verification link has sent",
    });
  } catch (err) {
    console.error(err);
    return Promise.reject({
      ...err,
      isSent: false,
    });
  }
};

const handleVerifyToken = async (admin, token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return Promise.resolve({ ...decodedToken });
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleSendEmailVerificationLink,
  handleVerifyToken,
};
