import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './nest_modules/database/database.module';
import { ConfigModule } from './nest_modules/config/config.module';
import { MigrationsModule } from './nest_modules/database/migrations.module';
import { MockModule } from './nest_modules/mock/mock.module';
import { ApplicationModule } from './nest_modules/application/application.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MigrationsModule,
    ApplicationModule,
    MockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
