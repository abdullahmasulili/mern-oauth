const admin = require("../config/firebase");
const User = require("../models/user");

async function authenticateUser(req, res) {
  const { firebaseToken, firstName, lastName } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email } = decodedToken;

    const user = await User.findOne({ where: { firebase_uid: uid } });

    if (!user) {
      const newUser = {
        firebase_uid: uid,
        first_name: firstName,
        last_name: lastName,
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
