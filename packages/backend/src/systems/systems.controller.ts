import { Controller, Get } from '@nestjs/common';
import { SystemsService } from './systems.service';

@Controller('api/systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {} 

  @Get()
  findAll() {
    return this.systemsService.getAllSystems();
  }
}
