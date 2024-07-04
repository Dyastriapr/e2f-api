"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nilai.belongsTo(models.Siswa, { foreignKey: "id_siswa" });
      Nilai.belongsTo(models.Kelas, { foreignKey: "id_kelas" });
      Nilai.belongsTo(models.TahunAjar, { foreignKey: "id_tahun_ajar" });
      Nilai.belongsTo(models.MataPelajaran, { foreignKey: "id_mapel" });
    }
  }
  Nilai.init(
    {
      id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Siswa",
          key: "id_siswa",
        },
      },
      id_kelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Kelas",
          key: "id_kelas",
        },
      },
      id_tahun_ajar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "TahunAjar",
          key: "id_tahun_ajar",
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
      credit_ganjil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      credit_genap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      debet_ganjil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      debet_genap: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Nilai",
    }
  );
  return Nilai;
};
