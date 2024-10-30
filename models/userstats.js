'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserStats.init({
    user_id: DataTypes.INTEGER,
    login_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserStats',
  });
  return UserStats;
};