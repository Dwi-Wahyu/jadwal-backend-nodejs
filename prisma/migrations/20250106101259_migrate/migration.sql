/*
  Warnings:

  - You are about to drop the `jadwal_peminjaman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `jadwal_peminjaman` DROP FOREIGN KEY `Jadwal_Peminjaman_nama_ruangan_fkey`;

-- DropTable
DROP TABLE `jadwal_peminjaman`;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id` VARCHAR(191) NOT NULL,
    `mulai` VARCHAR(191) NOT NULL,
    `selesai` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `aktivitas` VARCHAR(191) NOT NULL,
    `instansi` VARCHAR(191) NOT NULL,
    `nama_ruangan` VARCHAR(191) NOT NULL,
    `nomor_wa` VARCHAR(191) NOT NULL,
    `penanggung_jawab` VARCHAR(191) NOT NULL,
    `surat_permohonan` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Belum diapprove',

    INDEX `peminjaman_nama_ruangan_fkey`(`nama_ruangan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal` (
    `id` VARCHAR(191) NOT NULL,
    `mulai` VARCHAR(191) NOT NULL,
    `selesai` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `aktivitas` VARCHAR(191) NOT NULL,
    `nama_ruangan` VARCHAR(191) NOT NULL,

    INDEX `jadwal_nama_ruangan_fkey`(`nama_ruangan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_nama_ruangan_fkey` FOREIGN KEY (`nama_ruangan`) REFERENCES `ruangan`(`nama`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal` ADD CONSTRAINT `jadwal_nama_ruangan_fkey` FOREIGN KEY (`nama_ruangan`) REFERENCES `ruangan`(`nama`) ON DELETE RESTRICT ON UPDATE CASCADE;
