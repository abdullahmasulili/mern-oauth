const admin = require("../config/firebase");
const User = require("../models/user");

async function authenticateUser(req, res) {
  const payload = req.body;

  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(payload.firebaseToken);
    const { uid, email } = decodedToken;

    const user = await User.findOne({ where: { firebase_uid: uid } });

    if (!user) {
      const newUser = {
        firebase_uid: uid,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email,
        sign_up_timestamp: new Date(),
      };

      await User.create(newUser);
    }

    res.status(201).json({
      message: "Authentication succeed",
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "Unauthorized",
    });
  }
}

module.exports = authenticateUser;
