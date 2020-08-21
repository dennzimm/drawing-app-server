import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  const drawing1 = await prisma.drawing.create({
    data: {
      name: 'i921ncby87238uf',
      items: {
        create: [
          {
            name: 'g8712ye98712e',
            type: 'LAYER',
            data: 'LAYER_DATA',
          },
          {
            name: '189238iuofe98923',
            type: 'PATH',
            data: 'PATH_DATA',
          },
        ],
      },
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      firstname: 'John',
      lastname: 'Doe',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      drawings: {
        connect: {
          name: 'i921ncby87238uf',
        },
      },
    },
  });

  console.log({ drawing1, user1 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect();
  });
