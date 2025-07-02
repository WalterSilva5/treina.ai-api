import { PrismaService } from '../src/database/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prismaService = new PrismaService();

(async () => {
  const users = [
    {
      firstName: 'template',
      lastName: 'wsi',
      email: 'template.admin@wsi.com',
      password: await bcrypt.hash('P@ss1234', 10),
      role: Role.ADMIN
    },
    {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('Admin@123', 10),
      role: Role.ADMIN
    },
    {
      firstName: 'template',
      lastName: 'wsi',
      email: 'template.user@wsi.com',
      password: await bcrypt.hash('P@ss1234', 10),
      role: Role.USER
    },
    {
      firstName: 'template',
      lastName: 'wsi',
      email: 'template.manager@wsi.com',
      password: await bcrypt.hash('P@ss1234', 10),
      role: Role.MANAGER
    }
  ];

  for (const user of users) {
    await prismaService.user.upsert({
      where: {
        email: user.email
      },
      create: user,
      update: user
    });
  }
})();
