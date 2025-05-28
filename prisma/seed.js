import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Ganti dengan email dan password yang diinginkan
  const superAdminData = {
    email: "superadmin@gmail.com",
    password: await bcrypt.hash("secret", 10), // Hash password
    role: "Admin",
    nama: "Superadmin",
  };

  // Cek apakah superadmin sudah ada
  const existingSuperAdmin = await prisma.pengguna.findUnique({
    where: { email: superAdminData.email },
  });

  if (!existingSuperAdmin) {
    await prisma.pengguna.create({
      data: superAdminData,
    });
    console.log("Super admin berhasil dibuat!");
  } else {
    console.log("Super admin sudah ada, tidak dibuat lagi.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
