import { PurchaseOrder } from '../../../../domain/purchase-order';
import { PurchaseOrderItemMapper } from '../../../../../purchase-order-items/infrastructure/persistence/relational/mappers/purchase-order-item.mapper';

import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

import { PurchaseOrderEntity } from '../entities/purchase-order.entity';

export class PurchaseOrderMapper {
  static toDomain(raw: PurchaseOrderEntity): PurchaseOrder {
    const domainEntity = new PurchaseOrder();
    if (raw.purchaseOrderItems) {
      domainEntity.purchaseOrderItems = raw.purchaseOrderItems.map((item) =>
        PurchaseOrderItemMapper.toDomain(item),
      );
    }

    if (raw.supplierId) {
      domainEntity.supplierId = SupplierMapper.toDomain(raw.supplierId);
    } else if (raw.supplierId === null) {
      domainEntity.supplierId = null;
    }

    domainEntity.totalAmount = raw.totalAmount;

    domainEntity.status = raw.status;

    domainEntity.actualDeliveryDate = raw.actualDeliveryDate;

    domainEntity.expectedDeliveryDate = raw.expectedDeliveryDate;

    domainEntity.orderDate = raw.orderDate;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: PurchaseOrder): PurchaseOrderEntity {
    const persistenceEntity = new PurchaseOrderEntity();
    if (domainEntity.purchaseOrderItems) {
      persistenceEntity.purchaseOrderItems =
        domainEntity.purchaseOrderItems.map((item) =>
          PurchaseOrderItemMapper.toPersistence(item),
        );
    }

    if (domainEntity.supplierId) {
      persistenceEntity.supplierId = SupplierMapper.toPersistence(
        domainEntity.supplierId,
      );
    } else if (domainEntity.supplierId === null) {
      persistenceEntity.supplierId = null;
    }

    persistenceEntity.totalAmount = domainEntity.totalAmount;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.actualDeliveryDate = domainEntity.actualDeliveryDate;

    persistenceEntity.expectedDeliveryDate = domainEntity.expectedDeliveryDate;

    persistenceEntity.orderDate = domainEntity.orderDate;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
