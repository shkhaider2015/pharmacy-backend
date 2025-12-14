import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { GenericsEntity } from '../entities/generics.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Generics } from '../../../../domain/generics';
import { GenericsRepository } from '../../generics.repository';
import { GenericsMapper } from '../mappers/generics.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class GenericsRelationalRepository implements GenericsRepository {
  constructor(
    @InjectRepository(GenericsEntity)
    private readonly genericsRepository: Repository<GenericsEntity>,
  ) {}

  async create(data: Generics): Promise<Generics> {
    const persistenceModel = GenericsMapper.toPersistence(data);
    const newEntity = await this.genericsRepository.save(
      this.genericsRepository.create(persistenceModel),
    );
    return GenericsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Generics[]> {
    const entities = await this.genericsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => GenericsMapper.toDomain(entity));
  }

  async findById(id: Generics['id']): Promise<NullableType<Generics>> {
    const entity = await this.genericsRepository.findOne({
      where: { id },
    });

    return entity ? GenericsMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Generics['id'][]): Promise<Generics[]> {
    const entities = await this.genericsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => GenericsMapper.toDomain(entity));
  }

  async update(
    id: Generics['id'],
    payload: Partial<Generics>,
  ): Promise<Generics> {
    const entity = await this.genericsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.genericsRepository.save(
      this.genericsRepository.create(
        GenericsMapper.toPersistence({
          ...GenericsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return GenericsMapper.toDomain(updatedEntity);
  }

  async remove(id: Generics['id']): Promise<void> {
    await this.genericsRepository.delete(id);
  }
}
