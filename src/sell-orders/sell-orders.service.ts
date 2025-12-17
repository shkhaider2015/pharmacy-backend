import { productsService } from '../products/products.service';
import { products } from '../products/domain/products';

import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/domain/customer';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSellOrderDto } from './dto/create-sell-order.dto';
import { UpdateSellOrderDto } from './dto/update-sell-order.dto';
import { SellOrderRepository } from './infrastructure/persistence/sell-order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SellOrder } from './domain/sell-order';

@Injectable()
export class SellOrdersService {
  constructor(
    private readonly productsService: productsService,

    private readonly customerService: CustomersService,

    // Dependencies here
    private readonly sellOrderRepository: SellOrderRepository,
  ) {}

  async create(createSellOrderDto: CreateSellOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    const productsObjects = await this.productsService.findByIds(
      createSellOrderDto.products.map((entity) => entity.id),
    );
    if (productsObjects.length !== createSellOrderDto.products.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          products: 'notExists',
        },
      });
    }
    const products = productsObjects;

    const customerObject = await this.customerService.findById(
      createSellOrderDto.customer.id,
    );
    if (!customerObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          customer: 'notExists',
        },
      });
    }
    const customer = customerObject;

    return this.sellOrderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      products,

      customer,

      netPrice: createSellOrderDto.netPrice,

      discountPrice: createSellOrderDto.discountPrice,

      totalPrice: createSellOrderDto.totalPrice,

      paymentStatus: createSellOrderDto.paymentStatus,

      paymentMethod: createSellOrderDto.paymentMethod,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.sellOrderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SellOrder['id']) {
    return this.sellOrderRepository.findById(id);
  }

  findByIds(ids: SellOrder['id'][]) {
    return this.sellOrderRepository.findByIds(ids);
  }

  async update(
    id: SellOrder['id'],

    updateSellOrderDto: UpdateSellOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let products: products[] | undefined = undefined;

    if (updateSellOrderDto.products) {
      const productsObjects = await this.productsService.findByIds(
        updateSellOrderDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== updateSellOrderDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            products: 'notExists',
          },
        });
      }
      products = productsObjects;
    }

    let customer: Customer | undefined = undefined;

    if (updateSellOrderDto.customer) {
      const customerObject = await this.customerService.findById(
        updateSellOrderDto.customer.id,
      );
      if (!customerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            customer: 'notExists',
          },
        });
      }
      customer = customerObject;
    }

    return this.sellOrderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      products,

      customer,

      netPrice: updateSellOrderDto.netPrice,

      discountPrice: updateSellOrderDto.discountPrice,

      totalPrice: updateSellOrderDto.totalPrice,

      paymentStatus: updateSellOrderDto.paymentStatus,

      paymentMethod: updateSellOrderDto.paymentMethod,
    });
  }

  remove(id: SellOrder['id']) {
    return this.sellOrderRepository.remove(id);
  }
}
