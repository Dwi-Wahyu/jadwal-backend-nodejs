-- CreateTable
CREATE TABLE `jadwal_peminjaman` (
    `id` VARCHAR(191) NOT NULL,
    `mulai` INTEGER NOT NULL,
    `selesai` INTEGER NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `aktivitas` VARCHAR(191) NOT NULL,
    `instansi` VARCHAR(191) NOT NULL,
    `nama_ruangan` VARCHAR(191) NOT NULL,
    `nomor_wa` INTEGER NOT NULL,
    `penanggung_jawab` VARCHAR(191) NOT NULL,
    `surat_permohonan` VARCHAR(191) NOT NULL,

    INDEX `Jadwal_Peminjaman_nama_ruangan_fkey`(`nama_ruangan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengguna` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pengguna_email_key`(`email`),
    UNIQUE INDEX `Pengguna_password_key`(`password`),
    UNIQUE INDEX `Pengguna_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kapasitas` INTEGER NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ruangan_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jadwal_peminjaman` ADD CONSTRAINT `Jadwal_Peminjaman_nama_ruangan_fkey` FOREIGN KEY (`nama_ruangan`) REFERENCES `ruangan`(`nama`) ON DELETE RESTRICT ON UPDATE CASCADE;
