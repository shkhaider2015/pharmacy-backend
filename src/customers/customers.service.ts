import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './infrastructure/persistence/customer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Customer } from './domain/customer';

@Injectable()
export class CustomersService {
  constructor(
    // Dependencies here
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.customerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      address: createCustomerDto.address,

      phone: createCustomerDto.phone,

      email: createCustomerDto.email,

      companyName: createCustomerDto.companyName,

      type: createCustomerDto.type,

      name: createCustomerDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.customerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Customer['id']) {
    return this.customerRepository.findById(id);
  }

  findByIds(ids: Customer['id'][]) {
    return this.customerRepository.findByIds(ids);
  }

  async update(
    id: Customer['id'],

    updateCustomerDto: UpdateCustomerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.customerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      address: updateCustomerDto.address,

      phone: updateCustomerDto.phone,

      email: updateCustomerDto.email,

      companyName: updateCustomerDto.companyName,

      type: updateCustomerDto.type,

      name: updateCustomerDto.name,
    });
  }

  remove(id: Customer['id']) {
    return this.customerRepository.remove(id);
  }
}
