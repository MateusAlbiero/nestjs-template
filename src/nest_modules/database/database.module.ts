import { Global, Module, Scope } from '@nestjs/common';
import { getConnectionToken, SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import BadRequestError from '../../core/shared/domain/errors/bad-request.error';
import { CONFIG_SCHEMA_TYPE } from '../config/config.module';
import UnitOfWork from '../../core/shared/infrastructure/database/sequelize/unit-of-work';
import { Sequelize } from 'sequelize';
import MockModel from '../../core/mock/infrastructure/database/sequelize/models/mock.model';

const models = [MockModel];

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const dbVendor = configService.get('DB_VENDOR');

        if (dbVendor === 'sqlite') {
          return {
            dialect: 'sqlite',
            host: configService.get('DB_HOST'),
            models,
            logging: configService.get('DB_LOGGING')
              ? (msg) => console.log(msg)
              : false,
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
          };
        }

        if (dbVendor === 'postgres') {
          return {
            dialect: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            database: configService.get('DB_DATABASE'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            models,
            logging: configService.get('DB_LOGGING')
              ? (msg) => console.log(msg)
              : false,
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
            dialectOptions: {
              useUTC: false,
              timezone: '-03:00',
            },
            timezone: '-03:00',
          };
        }

        throw new BadRequestError(
          `Unsupported database configuration: ${dbVendor}`,
        );
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: UnitOfWork,
      useFactory: (sequelize: Sequelize) => {
        return new UnitOfWork(sequelize);
      },
      inject: [getConnectionToken()],
      scope: Scope.REQUEST,
    },
    {
      provide: 'UnitOfWork',
      useExisting: UnitOfWork,
      scope: Scope.REQUEST,
    },
  ],
  exports: ['UnitOfWork'],
})
export class DatabaseModule {}
