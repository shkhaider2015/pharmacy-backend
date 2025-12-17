import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from '../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierSeedService {
  constructor(
    @InjectRepository(SupplierEntity)
    private repository: Repository<SupplierEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          name: 'Acme Supplies',
          address: '123 Main St, Anytown, USA',
          phone: '555-1234',
          email: 'some@email.com',
          lastOrderDate: new Date('2024-01-15'),
        }),
      );
      await this.repository.save(
        this.repository.create({
          name: 'Global Traders',
          address: '456 Market St, Metropolis, USA',
          phone: '555-5678',
          email: 'some2@email.com',
          lastOrderDate: new Date('2024-02-20'),
        }),
      );
    }
  }
}
