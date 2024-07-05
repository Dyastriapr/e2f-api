// app.js atau server.js

// Import library yang dibutuhkan
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

// Inisialisasi aplikasi Express
const app = express();
const port = process.env.API_PORT || 5000;

// Sinkronisasi database MySQL
db.sequelize.sync();

// Middleware CORS
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk static files (jika diperlukan)
app.use("/uploads", express.static("uploads"));

// Route utama
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Menggunakan route yang sudah ditentukan
const kelasRoute = require("./router/kelasRoute");
const siswaRoute = require("./router/siswaRoute");
const matapelajaranRoute = require("./router/matapelajaranRoute");
const nilaiRoute = require("./router/nilaiRoute");
const tabunganRoute = require("./router/tabunganRoute");
const tahunajarRoute = require("./router/tahunajarRoute");
const guruRoute = require("./router/guruRoute");

app.use("/api/kelas", kelasRoute);
app.use("/api/siswa", siswaRoute);
app.use("/api/mata-pelajaran", matapelajaranRoute);
app.use("/api/nilai", nilaiRoute);
app.use("/api/tabungan", tabunganRoute);
app.use("/api/tahun-ajar", tahunajarRoute);
app.use("/api/guru", guruRoute);

// Menjalankan server Express
app.listen(port, () => {
  console.log(`Server app listening on http://localhost:${port}`);
});

module.exports = app;
