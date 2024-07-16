const express = require("express");
const router = express.Router();
const prestasiController = require("../controllers/prestasiController");
const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan file dengan timestamp untuk menghindari konflik nama
  },
});

const upload = multer({ storage: storage });

// Definisi route untuk prestasi
router.get("/", prestasiController.index); // Endpoint untuk menampilkan pesan welcome atau status
router.post(
  "/create",
  upload.single("sertifikat"),
  prestasiController.createData
); // Endpoint untuk membuat data prestasi dengan upload sertifikat
router.get("/fetch-all", prestasiController.getAll); // Endpoint untuk mengambil semua data prestasi
router.get("/:id", prestasiController.getByID); // Endpoint untuk mengambil data prestasi berdasarkan ID
router.put(
  "/update/:id",
  upload.single("sertifikat"),
  prestasiController.updateData
); // Endpoint untuk memperbarui data prestasi dan mengganti sertifikat jika perlu
router.delete("/delete", prestasiController.deleteData); // Endpoint untuk menghapus data prestasi

module.exports = router;
