import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class categoriesSeedService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private repository: Repository<CategoriesEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          name: 'Antibiotics',
          code: 'ANTIBIO',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'b2c3d4e5-f678-90ab-cdef-234567890abc',
          name: 'Pain Relievers',
          code: 'PAINREL',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'c3d4e5f6-7890-abcd-ef12-34567890abcd',
          name: 'Vitamins and Supplements',
          code: 'VITSUPP',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'd4e5f678-90ab-cdef-1234-567890abcdef',
          name: 'Antipyretics',
          code: 'ANTIPYR',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'e5f67890-abcd-ef12-3456-7890abcdef12',
          name: 'Antiseptics',
          code: 'ANTISEP',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'f67890ab-cdef-1234-5678-90abcdef1234',
          name: 'Cough and Cold Remedies',
          code: 'COUGHCLD',
        }),
      );
    }
  }
}
