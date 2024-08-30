import { Module } from '@nestjs/common';
import { MockController } from './mock.controller';
import { MOCK_PROVIDERS } from './mock.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import MockModel from '../../core/mock/infrastructure/database/sequelize/models/mock.model';

@Module({
  controllers: [MockController],
  imports: [SequelizeModule.forFeature([MockModel])],
  providers: [
    ...Object.values(MOCK_PROVIDERS.REPOSITORIES),
    ...Object.values(MOCK_PROVIDERS.USE_CASES),
  ],
})
export class MockModule {}
