import { PaymentStatus } from '../../../../domain/payment-status';

import { PaymentStatusEntity } from '../entities/payment-status.entity';

export class PaymentStatusMapper {
  static toDomain(raw: PaymentStatusEntity): PaymentStatus {
    const domainEntity = new PaymentStatus();
    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: PaymentStatus): PaymentStatusEntity {
    const persistenceEntity = new PaymentStatusEntity();
    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
