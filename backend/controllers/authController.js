const admin = require("../config/firebase");
const User = require("../models/user");
const UserStats = require("../models/user-stats");

async function authenticateUser(req, res) {
  const payload = req.body;

  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(payload.firebaseToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ where: { firebase_uid: uid } });

    if (!user) {
      const newUser = {
        firebase_uid: uid,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email,
        sign_up_timestamp: new Date(),
        sign_up_provider: payload.provider,
      };

      user = await User.create(newUser);
      await admin.auth().updateUser(uid, {
        displayName: [user.first_name, user.last_name].join(" "),
      });
    }

    await UserStats.create({
      login_count: 0,
      last_login_date: null,
    });

    res.status(201).json({
      message: "Authentication succeed",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "Unauthorized",
    });
  }
}

module.exports = authenticateUser;
