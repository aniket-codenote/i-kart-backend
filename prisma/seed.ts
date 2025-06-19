import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeders/roles.seeder'; 

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
