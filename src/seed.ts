import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/sequelize';
import { MigrationsModule } from './nest_modules/database/migrations.module';
import { seeder } from './core/shared/infrastructure/database/sequelize/seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationsModule, {
    logger: ['error'],
  });

  const sequelize = app.get(getConnectionToken());

  seeder(sequelize).runAsCLI();
}
bootstrap();
