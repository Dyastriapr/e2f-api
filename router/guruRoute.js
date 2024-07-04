const express = require("express");
const router = express.Router();
const guruController = require("../controllers/guruController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", guruController.index);
router.post("/create", upload.single("foto"), guruController.createData);
router.get("/fetch-all", guruController.getAll);
router.get("/:id", guruController.getByID);
router.put("/update/:id", upload.single("foto"), guruController.updateData);
router.delete("/delete", guruController.deleteData);

module.exports = router;
