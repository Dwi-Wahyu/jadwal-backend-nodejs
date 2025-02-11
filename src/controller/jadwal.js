const path = require("path");
const prisma = require("../libs/prisma");
const fs = require("fs");
const { log } = require("console");
const checkRuanganTerpakai = require("../function/checkRuanganTerpakai");
const checkMulaiSetelahSelesai = require("../function/checkMulaiSetelahSelesai");

const jadwalController = {};

jadwalController.getJadwalRuangan = async (req, res) => {
  const { id_ruangan } = req.params;

  try {
    const jadwal = await prisma.jadwal.findMany({
      where: {
        ruangan: {
          id: id_ruangan,
        },
      },
    });

    res.status(200).json({ data: jadwal });
  } catch (error) {
    res.status(301).json({ message: error });
  }
};

jadwalController.postJadwal = async (req, res) => {
  const { id_ruangan, mulai, selesai, tanggal, aktivitas } = req.body;

  const jadwalPadaTanggal = await prisma.jadwal.findMany({
    where: {
      tanggal,
      ruangan: {
        id: id_ruangan,
      },
    },
  });

  const ruanganTerpakai = await checkRuanganTerpakai(
    mulai,
    selesai,
    jadwalPadaTanggal
  );

  const mulaiSetelahSelesai = checkMulaiSetelahSelesai(mulai, selesai);

  if (mulaiSetelahSelesai) {
    res.status(200).json({
      success: false,
      message: "Waktu Mulai Harus Sebelum Waktu Selesai",
    });
    return;
  }

  if (ruanganTerpakai) {
    res.status(200).json({ success: false, message: "Ruangan tidak tersedia" });
    return;
  }

  try {
    await prisma.jadwal.create({
      data: {
        mulai,
        selesai,
        tanggal,
        aktivitas,
        ruangan: {
          connect: {
            id: id_ruangan,
          },
        },
      },
    });

    res.status(200).json({ success: true, message: "Berhasil create jadwal" });
  } catch (error) {
    console.log(error);

    res.status(301).json({ message: error });
  }
};

jadwalController.updateJadwal = async (req, res) => {
  const { id, id_ruangan, mulai, selesai, tanggal, aktivitas } = req.body;

  try {
    await prisma.jadwal.update({
      where: {
        id,
      },
      data: {
        mulai,
        selesai,
        tanggal,
        aktivitas,
        ruangan: {
          connect: {
            id: id_ruangan,
          },
        },
      },
    });

    res.status(200).json({ success: true, message: "Berhasil update jadwal" });
  } catch (error) {
    console.log(error);

    res.status(301).json({ success: false, error });
  }
};

jadwalController.getJadwal = async (req, res) => {
  const { per_page, page, tanggal, ruangan } = req.query;

  console.log(tanggal, ruangan);

  const totalDatas = await prisma.jadwal.count();
  const filtered = await prisma.jadwal.count({
    where: {
      tanggal: {
        contains: tanggal,
      },
      ruangan: {
        id: {
          contains: ruangan,
        },
      },
    },
  });
  const paged = await prisma.jadwal.findMany({
    skip: (page - 1) * per_page,
    take: parseInt(per_page),
    include: {
      ruangan: {
        select: {
          id: true,
        },
      },
    },
    where: {
      tanggal: {
        contains: tanggal,
      },
      ruangan: {
        id: {
          contains: ruangan,
        },
      },
    },
  });

  let totalPages = Math.ceil(filtered / per_page);

  res.status(200).json({
    data: { data: paged, totalDatas, totalPages, currentPage: parseInt(page) },
  });
};

jadwalController.getAllJadwal = async (req, res) => {
  try {
    const allJadwal = await prisma.jadwal.findMany();

    res.status(200).json({ data: allJadwal });
  } catch (error) {
    res.status(500).json({ error });
  }
};

jadwalController.deleteJadwal = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery = await prisma.jadwal.delete({
      where: {
        id,
      },
    });

    log(deleteQuery);

    res.status(200).json({ message: "Berhasil menghapus jadwal" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = jadwalController;
