import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

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
            name: item1Name,
            type: 'PATH',
            data: `["Path",{"name":"${item1Name}","applyMatrix":true,"data":{"immutable":false,"userID":"_s9iJ4soNeTA2QdEED7dO"},"segments":[[[346,180],[0,0],[0,-2.40894]],[[348,168],[-3.55508,1.06652],[10.67192,-3.20158]],[[394,166],[-9.05815,0],[3.70743,0]],[[416,167],[-5.51527,-1.70711],[30.55236,9.45668]],[[505,203],[-28.45518,-14.65873],[25.76808,13.27447]],[[582,242],[-26.94158,-11.02156],[14.31259,5.85515]],[[626,254],[-14.92813,-3.31736],[2.8073,0.62384]],[[640,257],[-2.19519,-2.19519],[0,0]]],"strokeColor":[0.83922,0.61961,0.18039],"strokeWidth":2,"strokeCap":"round","strokeJoin":"round"}]`,
          },
          {
            name: item2Name,
            type: 'PATH',
            data: `["Path",{"name":"${item2Name}","applyMatrix":true,"data":{"immutable":false,"userID":"_s9iJ4soNeTA2QdEED7dO"},"segments":[[[892,141],[0,0],[0,30.97699]],[[879,234],[5.19727,-30.53396],[-8.83072,51.88046]],[[861,391],[2.10644,-52.66107],[-0.89792,22.44795]],[[855,457],[2.44421,-21.99785],[-0.37602,3.38414]],[[851,484],[1.89643,-1.89643],[-1.88562,1.88562]],[[843,484],[2.66667,0],[-8.78558,0]],[[817,485],[8.84321,-0.65505],[-38.309,2.8377]],[[702,487],[38.41165,0],[-16,0]],[[654,487],[15.99266,0.48463],[-29.58911,-0.89664]],[[565,475],[29.36242,4.07811],[-55.50533,-7.70907]],[[397,458],[56.05153,1.86838],[-43.22411,-1.4408]],[[266,457],[43.23651,-2.54332],[-10.39917,0.61172]],[[234,463],[10.05395,-2.87256],[-3.52479,1.00708]],[[221,468],[3.01917,0],[-1.66667,0]],[[221,463],[0,1.66667],[0,-3.61449]],[[220,452],[0.44695,3.57564],[-1.53405,-12.27237]],[[213,415],[2.71779,12.23007],[-5.16303,-23.23363]],[[196,344],[1.83995,23.91936],[-1.59485,-20.73301]],[[196,281],[0,20.79848],[0,-15.81646]],[[201,233],[-3.11059,15.55294],[1.12464,-5.6232]],[[204,216],[0,5.68916],[0,-0.2]],[204,213],[[205,215],[-0.19526,-0.19526],[0,0]]],"strokeColor":[0.83922,0.61961,0.18039],"strokeWidth":2,"strokeCap":"round","strokeJoin":"round"}]`,
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
