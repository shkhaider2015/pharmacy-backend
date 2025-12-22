import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchEntity } from '../../../../batches/infrastructure/persistence/relational/entities/batch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatchSeedService {
  constructor(
    @InjectRepository(BatchEntity)
    private repository: Repository<BatchEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(this.repository.create({}));
    }
  }
}
