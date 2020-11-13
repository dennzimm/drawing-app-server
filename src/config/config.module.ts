import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

/**
 * The ConfigModule exposes a ConfigService which loads the appropriate .env file.
 * By default, the package looks for a .env file in the root directory of the application.
 *
 * The forRoot() method registers the ConfigService provider,
 * which provides a get() method for reading these parsed/merged configuration variables.
 * Since @nestjs/config relies on dotenv, it uses that package's rules
 * for resolving conflicts in environment variable names.
 *
 * The @Global() decorator makes the module global-scoped.
 * Global modules should be registered only once, generally by the root or core module.
 *
 * (https://docs.nestjs.com/techniques/configuration#configuration)
 */
@Global()
@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true })],
})
export class ConfigModule {}
