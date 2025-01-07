require("moment-timezone");

const moment = require("moment");
moment.tz("Asia/Makassar");

function checkMulaiSetelahSelesai(mulai, selesai) {
  const momentMulai = moment(mulai, "HH:mm");
  const momentSelesai = moment(selesai, "HH:mm");
  const mulaiSetelahSelesai = momentMulai.isAfter(momentSelesai);

  if (mulaiSetelahSelesai) {
    return true;
  }
  return false;
}

module.exports = checkMulaiSetelahSelesai;
