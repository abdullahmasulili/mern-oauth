const admin = require("../config/firebase");
const { handleVerifyToken } = require("../controllers/helpers/auth");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token unpresented" });
  }

  try {
    await handleVerifyToken(admin, token);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
