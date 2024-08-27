import { Module } from '@nestjs/common';
import { SystemsController } from './systems.controller';
import { SystemsService } from './systems.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from 'src/database/model/system';

@Module({
  imports: [TypeOrmModule.forFeature([System])],
  controllers: [SystemsController],
  providers: [SystemsService]
})
export class SystemsModule {}
