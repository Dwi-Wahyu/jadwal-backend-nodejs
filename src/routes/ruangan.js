const express = require("express");
const ruanganController = require("../controller/ruangan");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.get("/", ruanganController.getAllRuangan);

router.post("/", verifyToken, ruanganController.postRuangan);

router.get("/data", ruanganController.getRuangan);

module.exports = router;
