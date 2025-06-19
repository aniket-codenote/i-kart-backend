import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeders/roles.seeder';
import { seedUsers } from './seeders/users.seeder';

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  await seedUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
