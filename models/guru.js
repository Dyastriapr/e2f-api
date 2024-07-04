module.exports = (sequelize, DataTypes) => {
  const Guru = sequelize.define(
    "Guru",
    {
      nama_guru: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nip: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mata_pelajaran: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "gurus",
      timestamps: true,
    }
  );

  return Guru;
};
