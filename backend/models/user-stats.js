"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserStats.belongsTo(models.User, {
        as: "user",
        foreignKey: { name: "user_id", type: DataTypes.INTEGER },
      });
    }
  }
  UserStats.init(
    {
      user_id: DataTypes.INTEGER,
      login_count: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserStats",
      tableName: "user_stats",
    }
  );
  return UserStats;
};
