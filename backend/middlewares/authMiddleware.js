const admin = require("../config/firebase");
const { handleVerifyToken } = require("../controllers/helpers/auth");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token unpresented" });
  }

  try {
    const decodedToken = await handleVerifyToken(admin, token);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

module.exports = authenticateToken;
