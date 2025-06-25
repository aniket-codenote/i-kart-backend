import { PrismaClient } from '@prisma/client';
import { kebabCase } from 'lodash';

const prisma = new PrismaClient();

export const seedProducts = async () => {
  const users = await prisma.user.findMany();
  const catalogs = await prisma.catalog.findMany();

  if (users.length === 0 || catalogs.length === 0) {
    throw new Error('Users or catalogs not found. Please seed them first.');
  }

  const products = [
    {
      name: 'Classic Cotton T-Shirt',
      description: 'Comfortable and breathable cotton T-shirt for everyday wear.',
      priceCents: 1999,
      priceCurrency: 'USD',
    },
    {
      name: 'Premium Leather Wallet',
      description: 'Handcrafted wallet made of genuine leather.',
      priceCents: 3499,
      priceCurrency: 'USD',
    },
    {
      name: 'Stainless Steel Water Bottle',
      description: 'Eco-friendly, reusable bottle to keep your drinks cold or hot.',
      priceCents: 1299,
      priceCurrency: 'USD',
    },
    {
      name: 'Wireless Earbuds',
      description: 'Compact and high-quality audio performance.',
      priceCents: 4999,
      priceCurrency: 'USD',
    },
    {
      name: 'Minimalist Backpack',
      description: 'Lightweight and durable backpack for daily use.',
      priceCents: 2999,
      priceCurrency: 'USD',
    },
  ];

  let i = 0;
  for (const product of products) {
    const user = users[i % users.length];
    const catalog = catalogs[i % catalogs.length];

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        priceCurrency: product.priceCurrency,
        slug: `${kebabCase(product.name)}-${Date.now()}-${i}`, // ensures uniqueness
        userId: user.id,
        catalogId: catalog.id,
      },
    });

    i++;
  }

  console.log('Products seeded successfully');
};
