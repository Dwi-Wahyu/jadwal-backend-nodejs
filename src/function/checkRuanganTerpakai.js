require("moment-timezone");

const moment = require("moment");
moment.tz("Asia/Makassar");

async function checkRuanganTerpakai(
  mulaiPengajuan,
  selesaiPengajuan,
  jadwalPadaTanggal
) {
  let ruanganTerpakai = false;

  for (const item of jadwalPadaTanggal) {
    const start1 = moment(`${item.mulai}`, "HH:mm");
    const end1 = moment(`${item.selesai}`, "HH:mm");
    const start2 = moment(`${mulaiPengajuan}`, "HH:mm");
    const end2 = moment(`${selesaiPengajuan}`, "HH:mm");

    if (
      (start2.isAfter(start1) && end2.isBefore(end1)) ||
      (start2.isBefore(end1) && end2.isAfter(end1)) ||
      (start2.isBefore(start1) && end2.isAfter(start1))
    ) {
      ruanganTerpakai = true;
    }
  }

  return ruanganTerpakai;
}

module.exports = checkRuanganTerpakai;
