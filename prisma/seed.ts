import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  const drawingName = nanoid();
  const item1Name = nanoid();
  const item2Name = nanoid();
  const drawing1 = await prisma.drawing.create({
    data: {
      name: drawingName,
      items: {
        create: [
          {
            name: nanoid(),
            type: 'PATH',
            data: `"["Path",{"name":"${item1Name}","applyMatrix":true,"data":{"immutable":false,"userID":"1XXv1SvW_-LSp3wjTJl3t"},"segments":[[[389,201],[0,0],[0,-22.59549]],[[396,131],[-11.84157,20.29984],[2.75246,-4.7185]],[[404,125],[-3.86695,2.57796],[16.86544,-11.24363]],[[449,112],[-20.5076,0],[4.66667,0]],[[463,112],[-4.3948,-1.56957],[13.19381,4.71207]],[[512,153],[-7.85483,-11.22119],[16.93834,24.19763]],[[545,234],[-7.85031,-28.03684],[4.13041,14.75145]],[[563,279],[-11.349,-11.349],[9.73834,9.73834]],[[599,274],[-7.5153,8.14157],[12.71001,-13.76917]],[[622,206],[10.82411,19.8442],[-6.83346,-12.52801]],[[582,194],[11.64483,0],[-6.14686,0]],[[563,196],[5.40801,-3.60534],[-8.17935,5.4529]],[[542,220],[5.0878,-7.78133],[-15.43846,23.61176]],[[508,297],[10.79515,-25.70274],[-19.8935,47.36547]],[[445,439],[26.52291,-44.20485],[-11.58132,19.3022]],[[381,460],[21.47866,4.66927],[-3.94655,-0.85795]],[[357,449],[3.30408,1.88805],[-8.88692,-5.07824]],[[333,430],[7.20117,7.20117],[-2.00068,-2.00068]],[[328,417],[-5.73264,-5.73264],[0,0]]],"strokeColor":[0.99608,0.84314,0.84314],"strokeWidth":2,"strokeCap":"round","strokeJoin":"round"}]"`,
          },
          {
            name: nanoid(),
            type: 'PATH',
            data: `"["Path",{"name":"${item2Name}","applyMatrix":true,"data":{"immutable":false,"userID":"7SnirqQwz_dKxLQ9t5tWZ"},"segments":[[[154,90],[0,0],[0,1.97897]],[[175,91],[-1.42256,0],[17.15935,0]],[[251,98],[-12.35656,-12.35656],[0,0]]],"strokeColor":[0.99608,0.84314,0.84314],"strokeWidth":2,"strokeCap":"round","strokeJoin":"round"}]"`,
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
          name: drawingName,
        },
      },
    },
  });

  console.log({ drawing1, user1 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
