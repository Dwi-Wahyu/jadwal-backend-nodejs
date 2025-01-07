const express = require("express");
const penggunaController = require("../controller/pengguna");
const router = express.Router();

router.get("/", penggunaController.getPengguna);

router.post("/", penggunaController.postPengguna);

router.put("/", penggunaController.updatePengguna);

router.delete("/:id", penggunaController.deletePengguna);

module.exports = router;
