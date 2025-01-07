const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../libs/prisma");

const secret_key = process.env.secret_key;

router.post("/login", async (req, res) => {
  const { email, password, alwaysLogin } = req.body;

  const pengguna = await prisma.pengguna.findFirst({
    where: {
      email,
    },
  });

  if (!pengguna) {
    return res
      .status(401)
      .json({ status: "error", data: "Email/Password Salah!" });
  }

  const passwordMatch = await bcrypt.compareSync(password, pengguna.password);

  if (!passwordMatch) {
    return res
      .status(401)
      .json({ status: "error", data: "Email/Password Salah!" });
  }

  const token = jwt.sign({ user: pengguna }, secret_key, {
    expiresIn: 3600,
  });

  res.status(200).json({ token });
});

module.exports = router;
