const prisma = require("../libs/prisma");

const ruanganController = {};

ruanganController.postRuangan = async (req, res) => {
  const { nama, kategori, kapasitas } = req.body;

  try {
    await prisma.ruangan.create({
      data: {
        nama,
        kategori,
        kapasitas: parseInt(kapasitas),
      },
    });

    res.status(200).json({ success: true, data: "Berhasil create ruangan" });
  } catch (error) {
    res.status(301).json({ success: false, error });
  }
};

ruanganController.getAllRuangan = async (req, res) => {
  try {
    const allRuangan = await prisma.ruangan.findMany();

    res.status(200).json({ data: allRuangan });
  } catch (error) {
    res.status(301).json({ message: error });
  }
};

ruanganController.getRuangan = async (req, res) => {
  const { search, per_page, page } = req.query;

  const totalDatas = await prisma.ruangan.count();
  const filtered = await prisma.ruangan.count({
    where: {
      nama: {
        contains: search,
      },
    },
  });
  const paged = await prisma.ruangan.findMany({
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

module.exports = ruanganController;
