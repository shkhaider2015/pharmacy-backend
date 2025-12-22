import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatusEntity } from '../../../../payment-statuses/infrastructure/persistence/relational/entities/payment-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentStatusSeedService {
  constructor(
    @InjectRepository(PaymentStatusEntity)
    private repository: Repository<PaymentStatusEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Pending',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'In Progress',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Failed',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Success',
        }),
      );
    }
  }
}
