import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Platform administrator with full permissions',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@ikart.com' },
    update: {},
    create: {
      email: 'admin@ikart.com',
      phone: '1234567890',
      username: 'adminuser',
      roleId: adminRole.id,
    },
  });

  console.log('Admin user seeded successfully');
}
