'use strict';
const {
  Model
} = require('sequelize');
const BcryptPassword = require('../helpers/hash-password')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Task, {through: models.UserTask})
    }
    fullRole(){
      return `${this.name} ${this.role}`
    }
  };
  User.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate( (instance, option) => {
    instance.password =  BcryptPassword.hashPassword(instance.password)
  })
  return User;
};