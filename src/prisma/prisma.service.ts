import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * This service allows easy interaction with the database.
 * It uses the PrismaClient, which is automatically generated
 * based on the defined database schema.
 *
 * The main idea of a service is that it can inject dependencies.
 * This means objects can create various relationships with each other,
 * and the function of "wiring up" instances of objects can largely be
 * delegated to the Nest runtime system.
 *
 * (see https://docs.nestjs.com/providers)
 *
 * @export
 * @class PrismaService
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 * @implements {OnModuleDestroy}
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
