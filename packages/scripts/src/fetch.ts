import path from "path";
import fs from "fs";
import { setTimeout } from "node:timers/promises";

import { SpaceTradersAPI } from "api-client/src/index"; 

const client = new SpaceTradersAPI({
  $host: 'https://api.spacetraders.io/v2',
});

(async () => {
  const systemsPerRequest = 20;
  let page = 1;

  const systems = await client.getSystems({
    page,
    limit: systemsPerRequest
  });
  fs.writeFileSync(
    path.join(__dirname, "../output/response-1.json"),
    JSON.stringify(systems, null, 2),
  );

  const numberOfPages = systems.meta.total / systemsPerRequest;

  while (page <= numberOfPages) {
    page++;
    console.log(`getting page ${page} of ${numberOfPages}`);
    try {
      const systems = await client.getSystems({
        page,
        limit: systemsPerRequest
      });
      fs.writeFileSync(
        path.join(__dirname, `../output/response-${page}.json`),
        JSON.stringify(systems.data, null, 2),
      );
      console.log(`successfully got page ${page}`)
    } catch (e) {
      console.error(`error getting page ${page}:`, e);
      console.error('retrying in next loop...')
      page--;
    }
    await setTimeout(500);
  }
})();
