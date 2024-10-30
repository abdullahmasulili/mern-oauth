"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserActivity, {
        as: "user_activities",
        foreignKey: {
          name: "user_id",
          type: DataTypes.INTEGER,
        },
      });
      User.hasOne(models.UserStats, {
        as: "user_stats",
        foreignKey: {
          name: "user_id",
          type: DataTypes.INTEGER,
        },
      });
    }
  }
  User.init(
    {
      firebase_uid: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      sign_up_timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
