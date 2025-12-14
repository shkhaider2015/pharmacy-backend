import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Category } from '../../../../domain/categories';
import { categoriesRepository } from '../../categories.repository';
import { CategoryMapper } from '../mappers/categories.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class categoriesRelationalRepository implements categoriesRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async create(data: Category): Promise<Category> {
    const persistenceModel = CategoryMapper.toPersistence(data);
    const newEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(persistenceModel),
    );
    return CategoryMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Category[]> {
    const entities = await this.categoriesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CategoryMapper.toDomain(entity));
  }

  async findById(id: Category['id']): Promise<NullableType<Category>> {
    const entity = await this.categoriesRepository.findOne({
      where: { id },
    });

    return entity ? CategoryMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Category['id'][]): Promise<Category[]> {
    const entities = await this.categoriesRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => CategoryMapper.toDomain(entity));
  }

  async update(
    id: Category['id'],
    payload: Partial<Category>,
  ): Promise<Category> {
    const entity = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.categoriesRepository.save(
      this.categoriesRepository.create(
        CategoryMapper.toPersistence({
          ...CategoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CategoryMapper.toDomain(updatedEntity);
  }

  async remove(id: Category['id']): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
