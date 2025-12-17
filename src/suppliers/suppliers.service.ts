import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierRepository } from './infrastructure/persistence/supplier.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Supplier } from './domain/supplier';

@Injectable()
export class SuppliersService {
  constructor(
    // Dependencies here
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.supplierRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      lastOrderDate: createSupplierDto.lastOrderDate,

      address: createSupplierDto.address,

      phone: createSupplierDto.phone,

      email: createSupplierDto.email,

      name: createSupplierDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Supplier['id']) {
    return this.supplierRepository.findById(id);
  }

  findByIds(ids: Supplier['id'][]) {
    return this.supplierRepository.findByIds(ids);
  }

  async update(
    id: Supplier['id'],

    updateSupplierDto: UpdateSupplierDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.supplierRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      lastOrderDate: updateSupplierDto.lastOrderDate,

      address: updateSupplierDto.address,

      phone: updateSupplierDto.phone,

      email: updateSupplierDto.email,

      name: updateSupplierDto.name,
    });
  }

  remove(id: Supplier['id']) {
    return this.supplierRepository.remove(id);
  }
}
