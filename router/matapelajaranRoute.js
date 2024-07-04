const express = require("express");
const router = express.Router();
const matapelajaranController = require("../controllers/matapelajaranController");

router.get("/", matapelajaranController.index);
router.post("/create", matapelajaranController.createData);
router.get("/fetch-all", matapelajaranController.getAll);
router.get("/:id", matapelajaranController.getByID);
router.put("/update", matapelajaranController.updatedData);
router.delete("/delete", matapelajaranController.deleteData);
module.exports = router;
