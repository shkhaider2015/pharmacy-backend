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
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Manufacturer B',
          short: 'MB',
          origin: 'Germany',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Manufacturer C',
          short: 'MC',
          origin: 'Japan',
        }),
      );
    }
  }
}
