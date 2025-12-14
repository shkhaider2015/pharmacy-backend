import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class productsSeedService {
  constructor(
    @InjectRepository(productsEntity)
    private repository: Repository<productsEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          id: 'p1a2b3c4-d5e6-7890-abcd-ef1234567890',
          name: 'Panadol 500mg Tablet',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'p2b3c4d5-e678-90ab-cdef-234567890abc',
          name: 'Amoxil 250mg Capsule',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'p3c4d5e6-7890-abcd-ef12-34567890abcd',
          name: 'Hydroln Syrup 100ml',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'p4d5e678-90ab-cdef-1234-567890abcdef',
          name: 'Vitamin C 500mg Tablet',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'p5e67890-abcd-ef12-3456-7890abcdef12',
          name: 'Brufen 200mg Tablet',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'p6f7890ab-cdef-1234-5678-90abcdef1234',
          name: 'Regix 10mg Tablet',
        }),
      );
    }
  }
}
