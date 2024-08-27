import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from './index';

export const databaseModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  // relative to root!!
  database: '../../database/main.db',
  entities: Database.entities
})
