import { PurchaseOrderItem } from '../../../../domain/purchase-order-item';
import { PurchaseOrderMapper } from '../../../../../purchase-orders/infrastructure/persistence/relational/mappers/purchase-order.mapper';

import { productsMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/products.mapper';

import { PurchaseOrderItemEntity } from '../entities/purchase-order-item.entity';

export class PurchaseOrderItemMapper {
  static toDomain(raw: PurchaseOrderItemEntity): PurchaseOrderItem {
    const domainEntity = new PurchaseOrderItem();
    if (raw.purchaseOrder) {
      domainEntity.purchaseOrder = PurchaseOrderMapper.toDomain(
        raw.purchaseOrder,
      );
    }

    if (raw.product) {
      domainEntity.product = productsMapper.toDomain(raw.product);
    }

    domainEntity.total = raw.total;

    domainEntity.unitCost = raw.unitCost;

    domainEntity.RecievedQuantity = raw.RecievedQuantity;

    domainEntity.orderQuantity = raw.orderQuantity;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: PurchaseOrderItem,
  ): PurchaseOrderItemEntity {
    const persistenceEntity = new PurchaseOrderItemEntity();
    if (domainEntity.purchaseOrder) {
      persistenceEntity.purchaseOrder = PurchaseOrderMapper.toPersistence(
        domainEntity.purchaseOrder,
      );
    }

    if (domainEntity.product) {
      persistenceEntity.product = productsMapper.toPersistence(
        domainEntity.product,
      );
    }

    persistenceEntity.total = domainEntity.total;

    persistenceEntity.unitCost = domainEntity.unitCost;

    persistenceEntity.RecievedQuantity = domainEntity.RecievedQuantity;

    persistenceEntity.orderQuantity = domainEntity.orderQuantity;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
