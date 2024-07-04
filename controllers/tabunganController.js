const {
  Sequelize,
  sequelize,
  Tabungan,
  Siswa,
  MataPelajaran,
} = require("../models");

exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "prefix for end-poin tabungan ",
  });
};

exports.createData = async (req, res) => {
  const payloadData = req.body;
  try {
    const results = await Tabungan.create(payloadData);
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed create a new data",
      },
      errors: error.errors,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await Tabungan.findAll();
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};

exports.getByID = async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await Tabungan.findByPk(user_id);
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};

exports.updatedData = async (req, res) => {
  const payloadData = req.body;

  try {
    const results = await Tabungan.update(payloadData, {
      where: {
        id: payloadData.id,
      },
    });

    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.body;
  try {
    var message = "";
    const delete_user = await Tabungan.destroy({ where: { id } });
    if (delete_user) {
      message = "Successfully removed";
    } else {
      message = "Failed remove";
    }
    res.json({
      status: 200,
      message: message,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed remove data",
      },
      errors: error.errors,
    });
  }
};

exports.getTabungan = async (req, res) => {
  const { id_siswa, id_mapel } = req.params;
  try {
    const results = await Tabungan.findOne({
      where: {
        id_siswa,
        id_mapel,
      },
      include: [
        {
          model: Siswa,
          attributes: ["nama_siswa"],
        },
        {
          model: MataPelajaran,
          attributes: ["mata_pelajaran"],
        },
      ],
    });

    if (!results) {
      return res.status(404).json({
        status: 404,
        message: {
          user: "Tabungan data not found",
        },
      });
    }

    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(502).json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed to retrieve data",
      },
      errors: error.errors,
    });
  }
};