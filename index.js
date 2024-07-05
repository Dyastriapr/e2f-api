require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import middleware CORS

const app = express();
const port = process.env.API_PORT || 5000;
const db_mysql = require("./models");
db_mysql.sequelize.sync();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// Gunakan middleware CORS di seluruh aplikasi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const kelasRoute = require("./router/kelasRoute");
const siswaRoute = require("./router/siswaRoute");
const matapelajaranRoute = require("./router/matapelajaranRoute");
const nilaiRoute = require("./router/nilaiRoute");
const tabunganRoute = require("./router/tabunganRoute");
const tahunajarRoute = require("./router/tahunajarRoute");
const guruRoute = require("./router/guruRoute");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/kelas", kelasRoute);
app.use("/api/siswa", siswaRoute);
app.use("/api/mata-pelajaran", matapelajaranRoute);
app.use("/api/nilai", nilaiRoute);
app.use("/api/tabungan", tabunganRoute);
app.use("/api/tahun-ajar", tahunajarRoute);
app.use("/api/guru", guruRoute);

app.listen(port, () => {
  console.log(`Server app listening on http://localhost:${port}`);
});

module.exports = app;
