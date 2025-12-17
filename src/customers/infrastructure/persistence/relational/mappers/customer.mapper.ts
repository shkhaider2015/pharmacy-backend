import { Customer } from '../../../../domain/customer';

import { CustomerEntity } from '../entities/customer.entity';

export class CustomerMapper {
  static toDomain(raw: CustomerEntity): Customer {
    const domainEntity = new Customer();
    domainEntity.address = raw.address;

    domainEntity.phone = raw.phone;

    domainEntity.email = raw.email;

    domainEntity.companyName = raw.companyName;

    domainEntity.type = raw.type;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Customer): CustomerEntity {
    const persistenceEntity = new CustomerEntity();
    persistenceEntity.address = domainEntity.address;

    persistenceEntity.phone = domainEntity.phone;

    persistenceEntity.email = domainEntity.email;

    persistenceEntity.companyName = domainEntity.companyName;

    persistenceEntity.type = domainEntity.type;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
