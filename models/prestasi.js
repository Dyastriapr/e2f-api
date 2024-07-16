module.exports = (sequelize, DataTypes) => {
  const Prestasi = sequelize.define(
    "Prestasi",
    {
      nama_siswa: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      prestasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tingkat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sertifikat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "prestasis",
      timestamps: true,
    }
  );

  return Prestasi;
};
