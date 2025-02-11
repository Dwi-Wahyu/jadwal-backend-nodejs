require("moment-timezone");

const path = require("path");
const prisma = require("../libs/prisma");
const fs = require("fs");
const { log } = require("console");

const moment = require("moment");
const checkRuanganTerpakai = require("../function/checkRuanganTerpakai");
const checkMulaiSetelahSelesai = require("../function/checkMulaiSetelahSelesai");
moment.tz("Asia/Makassar");

const peminjamanController = {};

peminjamanController.approvePeminjaman = async (req, res) => {
  const { id } = req.params;

  try {
    const dataPeminjaman = await prisma.peminjaman.update({
      where: {
        id,
      },
      data: {
        status: "Approve",
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Berhasil approve peminjaman" });

    const { aktivitas, tanggal, mulai, selesai, nama_ruangan } = dataPeminjaman;

    await prisma.jadwal.create({
      data: {
        aktivitas,
        tanggal,
        mulai,
        selesai,
        nama_ruangan,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(301).json({ message: error });
  }
};

peminjamanController.tolakPeminjaman = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const peminjamanDitolak = await prisma.peminjaman.delete({
      where: {
        id,
      },
    });

    const suratPath = path.join(
      process.cwd(),
      "surat",
      peminjamanDitolak.surat_permohonan
    );

    fs.unlinkSync(suratPath);

    res
      .status(200)
      .json({ success: true, message: "Berhasil tolak peminjaman" });
  } catch (error) {
    console.log(error);

    res.status(301).json({ message: error });
  }
};

peminjamanController.postPeminjaman = async (req, res) => {
  const {
    id_ruangan,
    mulai,
    selesai,
    tanggal,
    aktivitas,
    instansi,
    penanggung_jawab,
    nomor_wa,
  } = req.body;
  const { file } = req;

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
    fs.unlinkSync(req.file.path);

    res.status(406).json({
      success: false,
      message: "Waktu Mulai Harus Sebelum Waktu Selesai",
    });
    return;
  }

  if (ruanganTerpakai) {
    fs.unlinkSync(req.file.path);

    res.status(406).json({ success: false, message: "Ruangan tidak tersedia" });
    return;
  }

  try {
    await prisma.peminjaman.create({
      data: {
        mulai,
        selesai,
        tanggal,
        aktivitas,
        instansi,
        penanggung_jawab,
        surat_permohonan: file.filename,
        nomor_wa,
        ruangan: {
          connect: {
            id: id_ruangan,
          },
        },
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Berhasil create peminjaman" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

peminjamanController.getPeminjaman = async (req, res) => {
  const { search, per_page, page, ruangan, status, tanggal } = req.query;

  const totalDatas = await prisma.peminjaman.count();
  const filtered = await prisma.peminjaman.count({
    where: {
      ...(status && { status: { equals: status } }),
      ...(tanggal && { tanggal: { contains: tanggal } }),
      ...(ruangan && { ruangan: { id: { contains: ruangan } } }),
    },
  });
  const paged = await prisma.peminjaman.findMany({
    skip: (page - 1) * per_page,
    take: parseInt(per_page),
    where: {
      ...(status && { status: { equals: status } }),
      ...(tanggal && { tanggal: { contains: tanggal } }),
      ...(ruangan && { ruangan: { id: { contains: ruangan } } }),
    },
  });

  let totalPages = Math.ceil(filtered / per_page);

  res.status(200).json({
    data: { data: paged, totalDatas, totalPages, currentPage: parseInt(page) },
  });
};

peminjamanController.getAllPeminjaman = async (req, res) => {
  try {
    const allPeminjaman = await prisma.peminjaman.findMany();

    res.status(200).json({ data: allPeminjaman });
  } catch (error) {
    res.status(408).json({ success: false, error });
  }
};

module.exports = peminjamanController;
