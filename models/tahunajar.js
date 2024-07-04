'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TahunAjar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TahunAjar.init({
    tahun_ajar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TahunAjar',
  });
  return TahunAjar;
};