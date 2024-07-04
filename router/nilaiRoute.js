const express = require("express");
const router = express.Router();
const nilaiController = require("../controllers/nilaiController");

router.get("/", nilaiController.index);
router.post("/create", nilaiController.createData);
router.get("/fetch-all", nilaiController.getAll);
router.get("/:id", nilaiController.getByID);
router.put("/update", nilaiController.updatedData);
router.delete("/delete", nilaiController.deleteData);

module.exports = router;
