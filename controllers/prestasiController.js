const { Prestasi } = require("../models");
const path = require("path");
const fs = require("fs");

exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "prefix for end-point prestasi",
  });
};

exports.createData = async (req, res) => {
  const payloadData = req.body;
  if (req.file) {
    payloadData.sertifikat = req.file.filename;
  }
  try {
    const results = await Prestasi.create(payloadData);
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
    const results = await Prestasi.findAll();
    const updatedResults = results.map((prestasi) => ({
      ...prestasi.dataValues,
      sertifikat: prestasi.sertifikat
        ? `${req.protocol}://${req.get("host")}/uploads/${prestasi.sertifikat}`
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
    const prestasi = await Prestasi.findByPk(id);
    if (prestasi) {
      const updatedPrestasi = {
        ...prestasi.dataValues,
        sertifikat: prestasi.sertifikat
          ? `${req.protocol}://${req.get("host")}/uploads/${
              prestasi.sertifikat
            }`
          : null,
      };
      res.json({
        status: 200,
        data: updatedPrestasi,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Prestasi not found",
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
    payloadData.sertifikat = req.file.filename;
  }

  try {
    const existingPrestasi = await Prestasi.findByPk(id);
    if (existingPrestasi.sertifikat && req.file) {
      const oldPath = path.join(
        __dirname,
        "../uploads",
        existingPrestasi.sertifikat
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const results = await Prestasi.update(payloadData, {
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
    const existingPrestasi = await Prestasi.findByPk(id);
    if (existingPrestasi.sertifikat) {
      const oldPath = path.join(
        __dirname,
        "../uploads",
        existingPrestasi.sertifikat
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const deletePrestasi = await Prestasi.destroy({ where: { id } });
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
