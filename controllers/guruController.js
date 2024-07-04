const { Guru } = require("../models");
const path = require("path");
const fs = require("fs");

exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "prefix for end-point guru",
  });
};

exports.createData = async (req, res) => {
  const payloadData = req.body;
  if (req.file) {
    payloadData.foto = req.file.filename;
  }
  try {
    const results = await Guru.create(payloadData);
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
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
    const results = await Guru.findAll();
    const updatedResults = results.map((guru) => ({
      ...guru.dataValues,
      foto: guru.foto
        ? `${req.protocol}://${req.get("host")}/uploads/${guru.foto}`
        : null,
    }));
    res.json({
      status: 200,
      data: updatedResults,
    });
  } catch (error) {
    res.json({
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
  const id = req.params.id;
  try {
    const guru = await Guru.findByPk(id);
    if (guru) {
      const updatedGuru = {
        ...guru.dataValues,
        foto: guru.foto
          ? `${req.protocol}://${req.get("host")}/uploads/${guru.foto}`
          : null,
      };
      res.json({
        status: 200,
        data: updatedGuru,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Guru not found",
      });
    }
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed to retrieve data",
      },
      errors: error.errors,
    });
  }
};

exports.updateData = async (req, res) => {
  const payloadData = req.body;
  const id = req.params.id;

  if (req.file) {
    payloadData.foto = req.file.filename;
  }

  try {
    const existingGuru = await Guru.findByPk(id);
    if (existingGuru.foto && req.file) {
      const oldPath = path.join(__dirname, "../uploads", existingGuru.foto);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const results = await Guru.update(payloadData, {
      where: { id: id },
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
        user: "Failed to update data",
      },
      errors: error.errors,
    });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.body;
  try {
    const existingGuru = await Guru.findByPk(id);
    if (existingGuru.foto) {
      const oldPath = path.join(__dirname, "../uploads", existingGuru.foto);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const deleteGuru = await Guru.destroy({ where: { id } });
    res.json({
      status: 200,
      message: "Successfully removed",
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed to remove data",
      },
      errors: error.errors,
    });
  }
};
