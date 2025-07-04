import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeders/roles.seeder';
import { seedUsers } from './seeders/users.seeder';
import { seedCategories } from './seeders/categories.seeder';
import { seedCatalogs } from './seeders/catalogs.seeder';
import { seedProducts } from './seeders/products.seeder';

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  await seedUsers();
  await seedCategories();
  await seedCatalogs();
  await seedProducts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
