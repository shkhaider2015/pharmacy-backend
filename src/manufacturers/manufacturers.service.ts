import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturerRepository } from './infrastructure/persistence/manufacturer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Manufacturer } from './domain/manufacturer';

@Injectable()
export class ManufacturersService {
  constructor(
    // Dependencies here
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.manufacturerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      short: createManufacturerDto.short,

      origin: createManufacturerDto.origin,

      address: createManufacturerDto.address,

      license: createManufacturerDto.license,

      name: createManufacturerDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.manufacturerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Manufacturer['id']) {
    return this.manufacturerRepository.findById(id);
  }

  findByIds(ids: Manufacturer['id'][]) {
    return this.manufacturerRepository.findByIds(ids);
  }

  async update(
    id: Manufacturer['id'],

    updateManufacturerDto: UpdateManufacturerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.manufacturerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      short: updateManufacturerDto.short,

      origin: updateManufacturerDto.origin,

      address: updateManufacturerDto.address,

      license: updateManufacturerDto.license,

      name: updateManufacturerDto.name,
    });
  }

  remove(id: Manufacturer['id']) {
    return this.manufacturerRepository.remove(id);
  }
}
