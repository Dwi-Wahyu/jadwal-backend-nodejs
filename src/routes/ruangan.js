const express = require("express");
const ruanganController = require("../controller/ruangan");
const verifyToken = require("../../middleware/auth");
const router = express.Router();

router.get("/", ruanganController.getAllRuangan);

router.post("/", verifyToken, ruanganController.postRuangan);

router.get("/data", ruanganController.getRuangan);

router.get("/dashboard-data", ruanganController.dashboardData);

router.put("/:id", verifyToken, ruanganController.updateRuangan);

router.delete("/:id", verifyToken, ruanganController.deleteRuangan);

module.exports = router;
