import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from 'src/database/model/system';
import { Repository } from 'typeorm';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>
  ) {}

  getAllSystems() {
    return this.systemRepository.find();
  }
}
