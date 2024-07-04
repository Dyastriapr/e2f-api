const express = require("express");
const router = express.Router();
const tabunganController = require("../controllers/tabunganController");

router.get("/", tabunganController.index);
router.post("/create", tabunganController.createData);
router.get("/fetch-all", tabunganController.getAll);
router.get("/:id", tabunganController.getByID);
router.get("/:id_siswa/:id_mapel", tabunganController.getTabungan);
router.put("/update", tabunganController.updatedData);
router.delete("/delete", tabunganController.deleteData);
module.exports = router;
