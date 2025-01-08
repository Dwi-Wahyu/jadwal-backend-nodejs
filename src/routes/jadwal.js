const express = require("express");
const jadwalController = require("../controller/jadwal");
const router = express.Router();

const verifyToken = require("../../middleware/auth");

router.get("/", jadwalController.getAllJadwal);

router.get("/:id_ruangan", jadwalController.getJadwalRuangan);

// router.get("/data", jadwalController.getJadwal);

router.post("/", verifyToken, jadwalController.postJadwal);

router.put("/", verifyToken, jadwalController.updateJadwal);

module.exports = router;
