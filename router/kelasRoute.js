const express = require("express");
const router = express.Router();
const kelasController = require("../controllers/kelasController");

router.get("/", kelasController.index);
router.post("/create", kelasController.createData);
router.get("/fetch-all", kelasController.getAll);
router.get("/:id", kelasController.getByID);
router.put("/update", kelasController.updatedData);
router.delete("/delete", kelasController.deleteData);
module.exports = router;
