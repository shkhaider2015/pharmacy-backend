import { PurchaseOrdersService } from '../purchase-orders/purchase-orders.service';
import { productsService } from '../products/products.service';
import { products } from '../products/domain/products';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreatePurchaseOrderItemDto } from './dto/create-purchase-order-item.dto';
import { UpdatePurchaseOrderItemDto } from './dto/update-purchase-order-item.dto';
import { PurchaseOrderItemRepository } from './infrastructure/persistence/purchase-order-item.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PurchaseOrderItem } from './domain/purchase-order-item';
import { PurchaseOrder } from '../purchase-orders/domain/purchase-order';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(
    @Inject(forwardRef(() => PurchaseOrdersService))
    private readonly purchaseOrderService: PurchaseOrdersService,

    private readonly productsService: productsService,

    // Dependencies here
    private readonly purchaseOrderItemRepository: PurchaseOrderItemRepository,
  ) {}

  async create(createPurchaseOrderItemDto: CreatePurchaseOrderItemDto) {
    // Do not remove comment below.
    // <creating-property />
    const purchaseOrderObject = await this.purchaseOrderService.findById(
      createPurchaseOrderItemDto.purchaseOrder.id,
    );
    if (!purchaseOrderObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          purchaseOrder: 'notExists',
        },
      });
    }
    const purchaseOrder = purchaseOrderObject;

    const productObject = await this.productsService.findById(
      createPurchaseOrderItemDto.product.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const product = productObject;

    return this.purchaseOrderItemRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      purchaseOrder,

      product,

      total: createPurchaseOrderItemDto.total,

      unitCost: createPurchaseOrderItemDto.unitCost,

      RecievedQuantity: createPurchaseOrderItemDto.RecievedQuantity,

      orderQuantity: createPurchaseOrderItemDto.orderQuantity,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.purchaseOrderItemRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PurchaseOrderItem['id']) {
    return this.purchaseOrderItemRepository.findById(id);
  }

  findByIds(ids: PurchaseOrderItem['id'][]) {
    return this.purchaseOrderItemRepository.findByIds(ids);
  }

  async update(
    id: PurchaseOrderItem['id'],

    updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let purchaseOrder: PurchaseOrder | undefined = undefined;

    if (updatePurchaseOrderItemDto.purchaseOrder) {
      const purchaseOrderObject = await this.purchaseOrderService.findById(
        updatePurchaseOrderItemDto.purchaseOrder.id,
      );
      if (!purchaseOrderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            purchaseOrder: 'notExists',
          },
        });
      }
      purchaseOrder = purchaseOrderObject;
    }

    let product: products | undefined = undefined;

    if (updatePurchaseOrderItemDto.product) {
      const productObject = await this.productsService.findById(
        updatePurchaseOrderItemDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    }

    return this.purchaseOrderItemRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      purchaseOrder,

      product,

      total: updatePurchaseOrderItemDto.total,

      unitCost: updatePurchaseOrderItemDto.unitCost,

      RecievedQuantity: updatePurchaseOrderItemDto.RecievedQuantity,

      orderQuantity: updatePurchaseOrderItemDto.orderQuantity,
    });
  }

  remove(id: PurchaseOrderItem['id']) {
    return this.purchaseOrderItemRepository.remove(id);
  }
}
