import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCategories = async () => {
  const categories = [
    {
      name: 'Clothing'
    },
    {
      name: 'Drinkware'
    },
    {
      name: 'Bags'
    },
    {
      name: 'Stationery'
    },
    {
      name: 'Accessories'
    }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('Categories seeded successfully');
};
