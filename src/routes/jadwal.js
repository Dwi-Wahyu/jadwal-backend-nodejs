const express = require("express");
const jadwalController = require("../controller/jadwal");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.get("/", jadwalController.getAllJadwal);

router.get("/:id_ruangan", jadwalController.getJadwalRuangan);

router.get("/data", verifyToken, jadwalController.getJadwal);

router.post("/", verifyToken, jadwalController.postJadwal);

router.put("/", verifyToken, jadwalController.updateJadwal);

module.exports = router;
