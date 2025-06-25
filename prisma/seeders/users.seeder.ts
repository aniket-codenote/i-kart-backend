import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  const roles = ['admin', 'customer', 'seller'];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description: `${name} role`,
      },
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  const customerRole = await prisma.role.findUnique({ where: { name: 'customer' } });
  const sellerRole = await prisma.role.findUnique({ where: { name: 'seller' } });

  await prisma.user.upsert({
    where: { email: 'admin@ikart.com' },
    update: {},
    create: {
      email: 'admin@ikart.com',
      phone: '1234567890',
      username: 'adminuser',
      roleId: adminRole!.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'customer@ikart.com' },
    update: {},
    create: {
      email: 'customer@ikart.com',
      phone: '1111111111',
      username: 'customeruser',
      roleId: customerRole!.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'seller1@ikart.com' },
    update: {},
    create: {
      email: 'seller1@ikart.com',
      phone: '2222222222',
      username: 'seller1',
      roleId: sellerRole!.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'seller2@ikart.com' },
    update: {},
    create: {
      email: 'seller2@ikart.com',
      phone: '3333333333',
      username: 'seller2',
      roleId: sellerRole!.id,
    },
  });

  console.log('Admin, customer, and sellers seeded successfully');
}
