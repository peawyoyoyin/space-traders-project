import fs from 'fs';
import path from 'path';
import { DataSource } from "typeorm";
import { System } from 'common/src/database/model/system';
import { Database } from 'common/src/database'
import { GetSystemsResponse } from 'api-client/src';

const database = new DataSource({
  type: 'sqlite',
  database: '../../database/main.db',
  entities: Database.entities,
});


(async () => {
  await database.initialize();
  await database.synchronize();

  const responseFolder = path.join(__dirname, '../output/responses');

  const responseFiles = fs.readdirSync(responseFolder);
  
  for (const responseFile of responseFiles) {
    const fullPath = path.join(responseFolder, responseFile);
    console.log(`reading ${fullPath}...`)
    const content = fs.readFileSync(fullPath);
    const parsedContent = JSON.parse(content.toString()) as GetSystemsResponse;
    
    for (const system of parsedContent.data) {
      const systemEntity = new System();
      systemEntity.symbol = system.symbol;
      systemEntity.type = system.type;
      systemEntity.x = system.x;
      systemEntity.y = system.y
  
      try {
        await database.manager.insert(System, systemEntity);
        console.log(`inserted system ${system.symbol}`);
      } catch (e) {
        console.warn(`failed to insert system ${system.symbol}:`, e);
      }
    }
  }
})()


