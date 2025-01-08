const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  const password = bcrypt.hashSync("secret", 10);
  const superadmin = await prisma.pengguna.create({
    data: {
      nama: "superadmin",
      email: "superadmin@gmail.com",
      password,
      role: "Admin",
    },
  });

  console.log(superadmin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
