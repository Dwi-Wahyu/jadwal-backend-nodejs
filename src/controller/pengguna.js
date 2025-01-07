const prisma = require("../libs/prisma");
const bcrypt = require("bcrypt");

const penggunaController = {};

penggunaController.postPengguna = async (req, res) => {
  const { nama, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await prisma.pengguna.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        role,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Berhasil create pengguna" });
  } catch (error) {
    console.log(error);

    res.status(301).json({ success: false, error });
  }
};

penggunaController.updatePengguna = async (req, res) => {
  const { id, nama, email, role } = req.body;

  console.log(req.body);

  try {
    await prisma.pengguna.update({
      where: {
        id,
      },
      data: {
        nama,
        email,
        role,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Berhasil create pengguna" });
  } catch (error) {
    console.log(error);

    res.status(301).json({ success: false, error });
  }
};

penggunaController.getPengguna = async (req, res) => {
  const { search, per_page, page } = req.query;

  const totalDatas = await prisma.pengguna.count();
  const filtered = await prisma.pengguna.count({
    where: {
      nama: {
        contains: search,
      },
    },
  });
  const paged = await prisma.pengguna.findMany({
    where: {
      nama: {
        contains: search,
      },
    },
    skip: (page - 1) * per_page,
    take: parseInt(per_page),
  });

  let totalPages = Math.ceil(filtered / per_page);

  res.status(200).json({
    data: { data: paged, totalDatas, totalPages, currentPage: parseInt(page) },
  });
};

penggunaController.deletePengguna = async (req, res) => {
  const { id } = req.params;

  await prisma.pengguna.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ success: true });
};

module.exports = penggunaController;
