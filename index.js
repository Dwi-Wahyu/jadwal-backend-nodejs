require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const auth = require("./src/routes/auth");
const ruanganRoutes = require("./src/routes/ruangan");
const penggunaRoutes = require("./src/routes/pengguna");
const jadwalRoutes = require("./src/routes/jadwal");
const peminjamanRoutes = require("./src/routes/peminjaman");
const path = require("path");
const jadwalController = require("./src/controller/jadwal");
const verifyToken = require("./middleware/auth");

app.use("/api/surat", express.static("surat"));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", auth);
app.use("/api/ruangan", ruanganRoutes);
app.use("/api/pengguna", verifyToken, penggunaRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/peminjaman", peminjamanRoutes);

app.get("/api/data-jadwal", verifyToken, jadwalController.getJadwal);

app.listen(3001, () => console.log("http://localhost:3001"));
