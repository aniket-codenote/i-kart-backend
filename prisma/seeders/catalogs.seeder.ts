import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCatalogs = async () => {
  const catalogs = [
    {
      name: 'T-Shirt',
      status: 'draft',
      userId: 1,
      categoryId: 1
    },
    {
      name: 'Cap',
      status: 'draft',
      userId: 1,
      categoryId: 1
    },
    {
      name: 'Mugs',
      status: 'draft',
      userId: 1,
      categoryId: 2
    },
    {
      name: 'Bottles',
      status: 'draft',
      userId: 1,
      categoryId: 2
    },
    {
      name: 'Branded Tote Bags',
      status: 'published',
      userId: 2,
      categoryId: 3
    },
    {
      name: 'Custom Notebooks',
      status: 'draft',
      userId: 2,
      categoryId: 4
    },
    {
      name: 'Phone Case Designs',
      status: 'published',
      userId: 1,
      categoryId: 5
    },
    {
      name: 'Keyring',
      status: 'published',
      userId: 1,
      categoryId: 5
    }
  ];

  for (const catalog of catalogs) {
    await prisma.catalog.create({
      data: catalog
    });
  }

  console.log('Catalogs seeded successfully');
};
