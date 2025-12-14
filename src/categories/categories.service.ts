import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatecategoriesDto } from './dto/create-categories.dto';
import { UpdatecategoriesDto } from './dto/update-categories.dto';
import { categoriesRepository } from './infrastructure/persistence/categories.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Category } from './domain/categories';

@Injectable()
export class CategoriesService {
  constructor(
    // Dependencies here
    private readonly categoriesRepository: categoriesRepository,
  ) {}

  async create(createcategoriesDto: CreatecategoriesDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.categoriesRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      code: createcategoriesDto.code,

      name: createcategoriesDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.categoriesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Category['id']) {
    return this.categoriesRepository.findById(id);
  }

  findByIds(ids: Category['id'][]) {
    return this.categoriesRepository.findByIds(ids);
  }

  async update(
    id: Category['id'],

    updatecategoriesDto: UpdatecategoriesDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.categoriesRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      code: updatecategoriesDto.code,

      name: updatecategoriesDto.name,
    });
  }

  remove(id: Category['id']) {
    return this.categoriesRepository.remove(id);
  }
}
