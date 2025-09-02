import { PrismaClient, Permissions } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminLogin = process.env.SEED_ADMIN_LOGIN || 'admin';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const adminFirstName = process.env.SEED_ADMIN_FIRST_NAME || 'Admin';
  const adminLastName = process.env.SEED_ADMIN_LAST_NAME || 'User';

  const existing = await prisma.user.findUnique({ where: { login: adminLogin } });
  if (existing) {
    console.log(`Admin user already exists: ${adminLogin}`);
    return;
  }

  const passwordHash = await hash(adminPassword);

  const user = await prisma.user.create({
    data: {
      login: adminLogin,
      password: passwordHash,
      firstName: adminFirstName,
      lastName: adminLastName,
      permissions: Permissions.ADMIN,
    },
  });

  console.log('Admin user created:', { login: user.login, id: user.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


