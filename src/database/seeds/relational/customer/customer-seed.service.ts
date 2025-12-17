import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../../../../customers/infrastructure/persistence/relational/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerSeedService {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Acme Corporation',
          type: 'Business',
          companyName: 'Acme Corp',
          email: 'acme@acme.com',
          phone: '123-456-7890',
          address: '123 Acme St, Metropolis, NY',
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'John Doe',
          type: 'Individual',
          email: 'john.doe@example.com',
          phone: '987-654-3210',
          address: '456 Elm St, Smalltown, TX',
        }),
      );
    }
  }
}
