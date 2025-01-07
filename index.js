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

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", auth);
app.use("/api/ruangan", ruanganRoutes);
app.use("/api/pengguna", penggunaRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/peminjaman", peminjamanRoutes);

app.listen(3001, () => console.log("http://localhost:3001"));
