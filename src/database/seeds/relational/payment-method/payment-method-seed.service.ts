import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodEntity } from '../../../../payment-methods/infrastructure/persistence/relational/entities/payment-method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodSeedService {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private repository: Repository<PaymentMethodEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Cash',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Easy Pesa',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Jazz Cash',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Debit Card',
        }),
      );
    }
  }
}
