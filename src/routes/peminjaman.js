const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const peminjamanController = require("../controller/peminjaman");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "surat_permohonan"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.get("/", peminjamanController.getAllPeminjaman);

router.get("/data", peminjamanController.getPeminjaman);

router.post("/approve/:id", peminjamanController.approvePeminjaman);

router.delete("/tolak/:id", peminjamanController.tolakPeminjaman);

router.post(
  "/",
  upload.single("surat_permohonan"),
  peminjamanController.postPeminjaman
);

module.exports = router;
