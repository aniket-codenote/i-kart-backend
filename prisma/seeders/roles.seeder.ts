import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedRoles = async () => {
  const roles = [
    { name: 'customer', description: 'Default role for regular customers' },
    { name: 'seller', description: 'User who can manage a store and list artworks' },
    { name: 'admin', description: 'Platform administrator with full permissions' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role,
    });
  }

  console.log('Roles seeded successfully');
};
