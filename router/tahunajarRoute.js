const express = require("express");
const router = express.Router();
const tahunajarController = require("../controllers/tahunajarController");

router.get("/", tahunajarController.index);
router.post("/create", tahunajarController.createData);
router.get("/fetch-all", tahunajarController.getAll);
router.get("/:id", tahunajarController.getByID);
router.put("/update", tahunajarController.updatedData);
router.delete("/delete", tahunajarController.deleteData);
module.exports = router;
