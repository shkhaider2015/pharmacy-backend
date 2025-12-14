import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericsEntity } from '../../../../generics/infrastructure/persistence/relational/entities/generics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class genericsSeedService {
  constructor(
    @InjectRepository(GenericsEntity)
    private repository: Repository<GenericsEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          id: 'd1e2f3a4-b5c6-7890-abcd-ef1234567890',
          name: 'Paracetamol',
          strength: '500mg',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'e2f3a4b5-c678-90ab-cdef-234567890abc',
          name: 'Amoxicillin',
          strength: '250mg',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'f3a4b5c6-7890-abcd-ef12-34567890abcd',
          name: 'Ibuprofen',
          strength: '200mg',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'a4b5c678-90ab-cdef-1234-567890abcdef',
          name: 'Cetirizine',
          strength: '10mg',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'b5c67890-abcd-ef12-3456-7890abcdef12',
          name: 'Azithromycin',
          strength: '500mg',
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'c67890ab-cdef-1234-5678-90abcdef1234',
          name: 'Loratadine',
          strength: '10mg',
        }),
      );
    }
  }
}
