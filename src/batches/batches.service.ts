import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchRepository } from './infrastructure/persistence/batch.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Batch } from './domain/batch';

@Injectable()
export class BatchesService {
  constructor(
    // Dependencies here
    private readonly batchRepository: BatchRepository,
  ) {}

  async create(createBatchDto: CreateBatchDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.batchRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      currentQuantity: createBatchDto.currentQuantity,

      initialQuantity: createBatchDto.initialQuantity,

      expiryDate: createBatchDto.expiryDate,

      manufacturerDate: createBatchDto.manufacturerDate,

      batchNumber: createBatchDto.batchNumber,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.batchRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Batch['id']) {
    return this.batchRepository.findById(id);
  }

  findByIds(ids: Batch['id'][]) {
    return this.batchRepository.findByIds(ids);
  }

  async update(
    id: Batch['id'],

    updateBatchDto: UpdateBatchDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.batchRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      currentQuantity: updateBatchDto.currentQuantity,

      initialQuantity: updateBatchDto.initialQuantity,

      expiryDate: updateBatchDto.expiryDate,

      manufacturerDate: updateBatchDto.manufacturerDate,

      batchNumber: updateBatchDto.batchNumber,
    });
  }

  remove(id: Batch['id']) {
    return this.batchRepository.remove(id);
  }
}
