import { Supplier } from '../../../../domain/supplier';

import { SupplierEntity } from '../entities/supplier.entity';

export class SupplierMapper {
  static toDomain(raw: SupplierEntity): Supplier {
    const domainEntity = new Supplier();
    domainEntity.lastOrderDate = raw.lastOrderDate;

    domainEntity.address = raw.address;

    domainEntity.phone = raw.phone;

    domainEntity.email = raw.email;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Supplier): SupplierEntity {
    const persistenceEntity = new SupplierEntity();
    persistenceEntity.lastOrderDate = domainEntity.lastOrderDate;

    persistenceEntity.address = domainEntity.address;

    persistenceEntity.phone = domainEntity.phone;

    persistenceEntity.email = domainEntity.email;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
