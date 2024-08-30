import { Global, Module } from '@nestjs/common';
import { APPLICATION_PROVIDERS } from './application.provider';

@Global()
@Module({
  providers: [...Object.values(APPLICATION_PROVIDERS.REPOSITORIES)],
  exports: [
    APPLICATION_PROVIDERS.REPOSITORIES.APPLICATION_SERVICE_SEQUELIZE_REPOSITORY
      .provide,
  ],
})
export class ApplicationModule {}
