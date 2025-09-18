import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@tourwow.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@tourwow.com',
      phone: '0267415000',
      passwordHash,
      role: 'admin',
    },
  });
  console.log('✅ Admin user created/updated');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 