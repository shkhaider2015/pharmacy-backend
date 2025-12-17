import { PurchaseOrderItemsService } from '../purchase-order-items/purchase-order-items.service';
import { PurchaseOrderItem } from '../purchase-order-items/domain/purchase-order-item';

import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { PurchaseOrderRepository } from './infrastructure/persistence/purchase-order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PurchaseOrder } from './domain/purchase-order';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @Inject(forwardRef(() => PurchaseOrderItemsService))
    private readonly purchaseOrderItemService: PurchaseOrderItemsService,

    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly purchaseOrderRepository: PurchaseOrderRepository,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    let supplierId: Supplier | null | undefined = undefined;

    if (createPurchaseOrderDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        createPurchaseOrderDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (createPurchaseOrderDto.supplierId === null) {
      supplierId = null;
    }

    const purchaseOrderItemsObjects =
      await this.purchaseOrderItemService.findByIds(
        createPurchaseOrderDto.purchaseOrderItems.map((entity) => entity.id),
      );
    if (
      purchaseOrderItemsObjects.length !==
      createPurchaseOrderDto.purchaseOrderItems.length
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          purchaseOrderItems: 'notExists',
        },
      });
    }
    const purchaseOrderItems = purchaseOrderItemsObjects;

    if (createPurchaseOrderDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        createPurchaseOrderDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (createPurchaseOrderDto.supplierId === null) {
      supplierId = null;
    }

    return this.purchaseOrderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      supplierId,

      purchaseOrderItems,

      totalAmount: createPurchaseOrderDto.totalAmount,

      status: createPurchaseOrderDto.status,

      actualDeliveryDate: createPurchaseOrderDto.actualDeliveryDate,

      expectedDeliveryDate: createPurchaseOrderDto.expectedDeliveryDate,

      orderDate: createPurchaseOrderDto.orderDate,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.purchaseOrderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PurchaseOrder['id']) {
    return this.purchaseOrderRepository.findById(id);
  }

  findByIds(ids: PurchaseOrder['id'][]) {
    return this.purchaseOrderRepository.findByIds(ids);
  }

  async update(
    id: PurchaseOrder['id'],

    updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let supplierId: Supplier | null | undefined = undefined;

    if (updatePurchaseOrderDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        updatePurchaseOrderDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (updatePurchaseOrderDto.supplierId === null) {
      supplierId = null;
    }

    let purchaseOrderItems: PurchaseOrderItem[] | undefined = undefined;

    if (updatePurchaseOrderDto.purchaseOrderItems) {
      const purchaseOrderItemsObjects =
        await this.purchaseOrderItemService.findByIds(
          updatePurchaseOrderDto.purchaseOrderItems.map((entity) => entity.id),
        );
      if (
        purchaseOrderItemsObjects.length !==
        updatePurchaseOrderDto.purchaseOrderItems.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            purchaseOrderItems: 'notExists',
          },
        });
      }
      purchaseOrderItems = purchaseOrderItemsObjects;
    }

    if (updatePurchaseOrderDto.supplierId) {
      const supplierIdObject = await this.supplierService.findById(
        updatePurchaseOrderDto.supplierId.id,
      );
      if (!supplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierId: 'notExists',
          },
        });
      }
      supplierId = supplierIdObject;
    } else if (updatePurchaseOrderDto.supplierId === null) {
      supplierId = null;
    }

    return this.purchaseOrderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      supplierId,

      purchaseOrderItems,

      totalAmount: updatePurchaseOrderDto.totalAmount,

      status: updatePurchaseOrderDto.status,

      actualDeliveryDate: updatePurchaseOrderDto.actualDeliveryDate,

      expectedDeliveryDate: updatePurchaseOrderDto.expectedDeliveryDate,

      orderDate: updatePurchaseOrderDto.orderDate,
    });
  }

  remove(id: PurchaseOrder['id']) {
    return this.purchaseOrderRepository.remove(id);
  }
}
