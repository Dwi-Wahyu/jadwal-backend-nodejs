require("moment-timezone");

const moment = require("moment");
moment.tz("Asia/Makassar");

const prisma = require("../libs/prisma");
const checkRuanganTerpakai = require("../function/checkRuanganTerpakai");

const ruanganController = {};

ruanganController.dashboardData = async (req, res) => {
  const tanggal = moment().format("YYYY-MM-DD");
  const waktuSekarang = moment();

  const jumlahRuangan = await prisma.ruangan.count({});
  const jumlahPeminjaman = await prisma.peminjaman.count({});
  const jadwalRuanganHariIni = await prisma.ruangan.findMany({
    where: {
      jadwal: {
        some: {
          tanggal,
        },
      },
    },
    include: {
      jadwal: {
        where: {
          tanggal,
        },
      },
    },
  });

  let jumlahRuanganTerpakai = 0;

  for (const ruangan of jadwalRuanganHariIni) {
    for (const jadwal of ruangan.jadwal) {
      const start = moment(jadwal.mulai, "HH:mm");
      const end = moment(jadwal.selesai, "HH:mm");

      if (waktuSekarang.isAfter(start) && waktuSekarang.isBefore(end)) {
        jumlahRuanganTerpakai += 1;
        break;
      }
    }
  }

  const jumlahRuanganTersedia = jumlahRuangan - jumlahRuanganTerpakai;

  res.status(200).json({
    success: true,
    jumlahRuangan,
    jumlahPeminjaman,
    jumlahRuanganTerpakai,
    jumlahRuanganTersedia,
  });
};

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

ruanganController.deleteRuangan = async (req, res) => {
  const { id } = req.params;

  try {
    const del = await prisma.ruangan.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ success: true, message: "Berhasil hapus ruangan" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

ruanganController.updateRuangan = async (req, res) => {
  const { id } = req.params;
  const { nama, kapasitas, kategori } = req.body;

  try {
    await prisma.ruangan.update({
      where: {
        id,
      },
      data: {
        nama,
        kapasitas,
        kategori,
      },
    });

    res.status(200).json({ success: true, message: "Berhasil update ruangan" });
  } catch (error) {
    res.status(500).json({ success: false, error });
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
