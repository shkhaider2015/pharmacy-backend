import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateGenericsDto } from './dto/create-generics.dto';
import { UpdateGenericsDto } from './dto/update-generics.dto';
import { GenericsRepository } from './infrastructure/persistence/generics.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Generics } from './domain/generics';

@Injectable()
export class GenericsService {
  constructor(
    // Dependencies here
    private readonly genericsRepository: GenericsRepository,
  ) {}

  async create(createGenericsDto: CreateGenericsDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.genericsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      strength: createGenericsDto.strength,

      name: createGenericsDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.genericsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Generics['id']) {
    return this.genericsRepository.findById(id);
  }

  findByIds(ids: Generics['id'][]) {
    return this.genericsRepository.findByIds(ids);
  }

  async update(
    id: Generics['id'],

    updateGenericsDto: UpdateGenericsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.genericsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      strength: updateGenericsDto.strength,

      name: updateGenericsDto.name,
    });
  }

  remove(id: Generics['id']) {
    return this.genericsRepository.remove(id);
  }
}
