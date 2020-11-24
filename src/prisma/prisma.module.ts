import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Prisma is an open-source database toolkit.
 * You can use it to query data from a database inside a Node.js or TypeScript application.
 * Prisma is used as an alternative to writing plain SQL, or using another database access
 * tool such as SQL query builders (like knex.js) or ORMs (like TypeORM and Sequelize).
 *
 * We need to register the services with Nest so that it
 * can perform the injection. We do this by adding the services
 * to the providers array of the @Module() decorator.
 *
 * (see https://docs.nestjs.com/recipes/prisma#prisma)
 *
 * @export
 * @class PrismaModule
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
