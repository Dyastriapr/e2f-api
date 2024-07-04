"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tabungan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tabungan.belongsTo(models.Siswa, { foreignKey: "id_siswa" });
      Tabungan.belongsTo(models.MataPelajaran, { foreignKey: "id_mapel" });
    }
  }
  Tabungan.init(
    {
      id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Siswa",
          key: "id_siswa",
        },
      },
      id_mapel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "MataPelajaran",
          key: "id_mapel",
        },
      },
      saldo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tabungan",
    }
  );
  return Tabungan;
};
