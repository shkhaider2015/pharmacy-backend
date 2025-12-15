import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ManufacturerEntity } from '../entities/manufacturer.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Manufacturer } from '../../../../domain/manufacturer';
import { ManufacturerRepository } from '../../manufacturer.repository';
import { ManufacturerMapper } from '../mappers/manufacturer.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ManufacturerRelationalRepository
  implements ManufacturerRepository
{
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
  ) {}

  async create(data: Manufacturer): Promise<Manufacturer> {
    const persistenceModel = ManufacturerMapper.toPersistence(data);
    const newEntity = await this.manufacturerRepository.save(
      this.manufacturerRepository.create(persistenceModel),
    );
    return ManufacturerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Manufacturer[]> {
    const entities = await this.manufacturerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ManufacturerMapper.toDomain(entity));
  }

  async findById(id: Manufacturer['id']): Promise<NullableType<Manufacturer>> {
    const entity = await this.manufacturerRepository.findOne({
      where: { id },
    });

    return entity ? ManufacturerMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Manufacturer['id'][]): Promise<Manufacturer[]> {
    const entities = await this.manufacturerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ManufacturerMapper.toDomain(entity));
  }

  async update(
    id: Manufacturer['id'],
    payload: Partial<Manufacturer>,
  ): Promise<Manufacturer> {
    const entity = await this.manufacturerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.manufacturerRepository.save(
      this.manufacturerRepository.create(
        ManufacturerMapper.toPersistence({
          ...ManufacturerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ManufacturerMapper.toDomain(updatedEntity);
  }

  async remove(id: Manufacturer['id']): Promise<void> {
    await this.manufacturerRepository.delete(id);
  }
}
