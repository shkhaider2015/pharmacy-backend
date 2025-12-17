import { NestFactory } from '@nestjs/core';
import { PurchaseOrderItemSeedService } from './purchase-order-item/purchase-order-item-seed.service';
import { PurchaseOrderSeedService } from './purchase-order/purchase-order-seed.service';
import { SupplierSeedService } from './supplier/supplier-seed.service';
import { ManufacturerSeedService } from './manufacturer/manufacturer-seed.service';
import { productsSeedService } from './products/products-seed.service';
import { genericsSeedService } from './generics/generics-seed.service';
import { categoriesSeedService } from './categories/categories-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.get(categoriesSeedService).run();

  await app.get(genericsSeedService).run();

  await app.get(productsSeedService).run();

  await app.get(ManufacturerSeedService).run();

  await app.get(SupplierSeedService).run();

  await app.get(PurchaseOrderSeedService).run();

  await app.get(PurchaseOrderItemSeedService).run();

  await app.close();
};

void runSeed();
