import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseModule } from './database/database.module';
import { SystemsModule } from './systems/systems.module';

@Module({
  imports: [databaseModule, SystemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
