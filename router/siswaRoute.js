const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswaController");

router.get("/", siswaController.index);
router.post("/create", siswaController.createData);
router.get("/fetch-all", siswaController.getAll);
router.get("/:id", siswaController.getByID);
router.put("/update", siswaController.updatedData);
router.delete("/delete", siswaController.deleteData);
module.exports = router;
