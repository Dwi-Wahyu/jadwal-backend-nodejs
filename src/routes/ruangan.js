const express = require("express");
const ruanganController = require("../controller/ruangan");
const router = express.Router();

router.get("/", ruanganController.getAllRuangan);

router.post("/", ruanganController.postRuangan);

router.get("/data", ruanganController.getRuangan);

module.exports = router;
