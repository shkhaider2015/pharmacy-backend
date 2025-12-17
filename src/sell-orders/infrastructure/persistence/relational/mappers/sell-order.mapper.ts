import { SellOrder } from '../../../../domain/sell-order';
import { productsMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/products.mapper';

import { CustomerMapper } from '../../../../../customers/infrastructure/persistence/relational/mappers/customer.mapper';

import { SellOrderEntity } from '../entities/sell-order.entity';

export class SellOrderMapper {
  static toDomain(raw: SellOrderEntity): SellOrder {
    const domainEntity = new SellOrder();
    if (raw.products) {
      domainEntity.products = raw.products.map((item) =>
        productsMapper.toDomain(item),
      );
    }

    if (raw.customer) {
      domainEntity.customer = CustomerMapper.toDomain(raw.customer);
    }

    domainEntity.netPrice = raw.netPrice;

    domainEntity.discountPrice = raw.discountPrice;

    domainEntity.totalPrice = raw.totalPrice;

    domainEntity.paymentStatus = raw.paymentStatus;

    domainEntity.paymentMethod = raw.paymentMethod;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: SellOrder): SellOrderEntity {
    const persistenceEntity = new SellOrderEntity();
    if (domainEntity.products) {
      persistenceEntity.products = domainEntity.products.map((item) =>
        productsMapper.toPersistence(item),
      );
    }

    if (domainEntity.customer) {
      persistenceEntity.customer = CustomerMapper.toPersistence(
        domainEntity.customer,
      );
    }

    persistenceEntity.netPrice = domainEntity.netPrice;

    persistenceEntity.discountPrice = domainEntity.discountPrice;

    persistenceEntity.totalPrice = domainEntity.totalPrice;

    persistenceEntity.paymentStatus = domainEntity.paymentStatus;

    persistenceEntity.paymentMethod = domainEntity.paymentMethod;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
