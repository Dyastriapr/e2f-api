const { Nilai, Siswa, Kelas, TahunAjar, MataPelajaran } = require("../models");

exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "prefix for end-point nilai",
  });
};

exports.createData = async (req, res) => {
  const payloadData = req.body;
  try {
    const results = await Nilai.create(payloadData);
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.status(502).json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed to create new data",
      },
      errors: error.errors,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await Nilai.findAll({
      include: [
        {
          model: Siswa,
        },
        {
          model: Kelas,
        },
        {
          model: TahunAjar,
        },
        {
          model: MataPelajaran,
        },
      ],
    });
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
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

exports.getByID = async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await Nilai.findByPk(user_id, {
      include: [
        {
          model: Siswa,
        },
        {
          model: Kelas,
        },
        {
          model: TahunAjar,
        },
        {
          model: MataPelajaran,
        },
      ],
    });
    if (results) {
      res.json({
        status: 200,
        data: results,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: {
          user: "Data not found",
        },
      });
    }
  } catch (error) {
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

exports.updatedData = async (req, res) => {
  const payloadData = req.body;

  try {
    const [updatedRows] = await Nilai.update(payloadData, {
      where: {
        id: payloadData.id,
      },
    });

    if (updatedRows > 0) {
      const updatedData = await Nilai.findByPk(payloadData.id);
      res.json({
        status: 200,
        data: updatedData,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: {
          user: "Data not found",
        },
      });
    }
  } catch (error) {
    res.status(502).json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed to update data",
      },
      errors: error.errors,
    });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteUser = await Nilai.destroy({ where: { id } });
    if (deleteUser) {
      res.json({
        status: 200,
        message: "Successfully removed",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Failed to remove",
      });
    }
  } catch (error) {
    res.status(502).json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed to remove data",
      },
      errors: error.errors,
    });
  }
};
