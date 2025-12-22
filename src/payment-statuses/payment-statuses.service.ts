import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { PaymentStatusRepository } from './infrastructure/persistence/payment-status.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PaymentStatus } from './domain/payment-status';

@Injectable()
export class PaymentStatusesService {
  constructor(
    // Dependencies here
    private readonly paymentStatusRepository: PaymentStatusRepository,
  ) {}

  async create(createPaymentStatusDto: CreatePaymentStatusDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.paymentStatusRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createPaymentStatusDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.paymentStatusRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PaymentStatus['id']) {
    return this.paymentStatusRepository.findById(id);
  }

  findByIds(ids: PaymentStatus['id'][]) {
    return this.paymentStatusRepository.findByIds(ids);
  }

  async update(
    id: PaymentStatus['id'],

    updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.paymentStatusRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updatePaymentStatusDto.name,
    });
  }

  remove(id: PaymentStatus['id']) {
    return this.paymentStatusRepository.remove(id);
  }
}
