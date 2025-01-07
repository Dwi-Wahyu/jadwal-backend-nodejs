const express = require("express");
const jadwalController = require("../controller/jadwal");
const router = express.Router();

router.get("/", jadwalController.getAllJadwal);

router.get("/:id_ruangan", jadwalController.getJadwalRuangan);

router.get("/data", jadwalController.getJadwal);

router.post("/", jadwalController.postJadwal);

router.put("/", jadwalController.updateJadwal);

module.exports = router;
