import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerEntity } from '../../../../manufacturers/infrastructure/persistence/relational/entities/manufacturer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturerSeedService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private repository: Repository<ManufacturerEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Manufacturer A',
          short: 'MA',
          origin: 'USA',
          address: '100 Industrial Way, Anytown, USA',
          license: 'LIC123456',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Manufacturer B',
          short: 'MB',
          origin: 'Germany',
          address: '200 Manufacturing Rd, Industriestadt, Germany',
          license: 'LIC654321',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Manufacturer C',
          short: 'MC',
          origin: 'Japan',
          address: '300 Production St, Tokyo, Japan',
          license: 'LIC112233',
        }),
      );
    }
  }
}
