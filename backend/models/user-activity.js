"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserActivity.belongsTo(models.User, {
        as: "user",
        foreignKey: { name: "user_id", type: DataTypes.INTEGER },
      });
    }
  }
  UserActivity.init(
    {
      user_id: DataTypes.INTEGER,
      login_timestamp: DataTypes.DATE,
      logout_timestamp: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserActivity",
      tableName: "user_activities",
    }
  );
  return UserActivity;
};
