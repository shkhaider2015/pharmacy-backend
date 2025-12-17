import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';
import { GenericsEntity } from '../../../../generics/infrastructure/persistence/relational/entities/generics.entity';
import { ManufacturerEntity } from '../../../../manufacturers/infrastructure/persistence/relational/entities/manufacturer.entity';

@Injectable()
export class productsSeedService {
  constructor(
    @InjectRepository(productsEntity)
    private repository: Repository<productsEntity>,

    @InjectRepository(CategoriesEntity)
    private categoriesRepository: Repository<CategoriesEntity>,

    @InjectRepository(GenericsEntity)
    private genericsRepository: Repository<GenericsEntity>,

    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();
    const categories = await this.categoriesRepository.find();
    const generics = await this.genericsRepository.find();
    const manufacturers = await this.manufacturerRepository.find();

    if (categories.length === 0) {
      throw new Error('Categories must be seeded before seeding products.');
    }
    if (generics.length === 0) {
      throw new Error('Generics must be seeded before seeding products.');
    }
    if (manufacturers.length === 0) {
      throw new Error('Manufacturers must be seeded before seeding products.');
    }

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          id: '4f6c7b9a-1e0d-4c3f-9876-2a1b0c9d8e7f',
          name: 'Panadol 500mg Tablet',
          stock: 100,
          isPrescriptionRequired: false,
          categories: [categories[0]],
          generics: [generics[0]],
          manufacturer: manufacturers[0],
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'b8e5a7d3-f0c9-4b1a-8e7d-6c5b4a3f2e1d',
          name: 'Amoxil 250mg Capsule',
          stock: 200,
          isPrescriptionRequired: true,
          categories: [categories[1]],
          generics: [generics[1]],
          manufacturer: manufacturers[1],
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'c0d1e2f3-4a5b-46c7-8d9e-0f1a2b3c4d5e',
          name: 'Hydroln Syrup 100ml',
          stock: 150,
          isPrescriptionRequired: false,
          categories: [categories[5]],
          generics: [generics[2]],
          manufacturer: manufacturers[2],
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: '12345678-abcd-4ef0-9876-543210fedcba',
          name: 'Vitamin C 500mg Tablet',
          stock: 300,
          isPrescriptionRequired: false,
          categories: [categories[2]],
          generics: [generics[3]],
          manufacturer: manufacturers[0],
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: 'a9b8c7d6-e5f4-4103-9210-3456789abcde',
          name: 'Brufen 200mg Tablet',
          stock: 250,
          isPrescriptionRequired: true,
          categories: [categories[1]],
          generics: [generics[4]],
          manufacturer: manufacturers[1],
        }),
      );
      await this.repository.save(
        this.repository.create({
          id: '77665544-3322-4110-00aa-bbccddeeff11',
          name: 'Regix 10mg Tablet',
          stock: 180,
          isPrescriptionRequired: true,
          categories: [categories[3]],
          generics: [generics[5]],
          manufacturer: manufacturers[2],
        }),
      );
    }
  }
}
