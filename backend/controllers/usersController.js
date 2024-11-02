const { handleGetUsers, handleGetUserByUID } = require("./helpers/users");

const getUsers = async (req, res, next) => {
  try {
    const users = await handleGetUsers();

    res.status(200).json({
      message: "Get Users Succeed",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getUserByUID = async (req, res, next) => {
  const user = await handleGetUserByUID(req.params.uid);
  try {
    res.status(200).json({
      message: "Get User By UID Succeed",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUserByUID };
