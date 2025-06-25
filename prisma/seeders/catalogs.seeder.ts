import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCatalogs = async () => {
  const seller1 = await prisma.user.findUnique({ where: { email: 'seller1@ikart.com' } });
  const seller2 = await prisma.user.findUnique({ where: { email: 'seller2@ikart.com' } });

  const categories = await prisma.category.findMany();

  if (!seller1 || !seller2 || categories.length < 5) {
    throw new Error('Required users or categories are missing. Seed them first.');
  }

  const catalogs = [
    {
      name: 'T-Shirt',
      status: 'draft',
      userId: seller1.id,
      categoryId: categories[0].id,
    },
    {
      name: 'Cap',
      status: 'draft',
      userId: seller1.id,
      categoryId: categories[0].id,
    },
    {
      name: 'Mugs',
      status: 'draft',
      userId: seller1.id,
      categoryId: categories[1].id,
    },
    {
      name: 'Bottles',
      status: 'draft',
      userId: seller1.id,
      categoryId: categories[1].id,
    },
    {
      name: 'Branded Tote Bags',
      status: 'published',
      userId: seller2.id,
      categoryId: categories[2].id,
    },
    {
      name: 'Custom Notebooks',
      status: 'draft',
      userId: seller2.id,
      categoryId: categories[3].id,
    },
    {
      name: 'Phone Case Designs',
      status: 'published',
      userId: seller1.id,
      categoryId: categories[4].id,
    },
    {
      name: 'Keyring',
      status: 'published',
      userId: seller1.id,
      categoryId: categories[4].id,
    },
  ];

  for (const catalog of catalogs) {
    await prisma.catalog.create({ data: catalog });
  }

  console.log('Catalogs seeded successfully');
};
