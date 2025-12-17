import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSupplierAndPurchaseOrder1765878926141
  implements MigrationInterface
{
  name = 'CreateSupplierAndPurchaseOrder1765878926141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "supplier" ("lastOrderDate" TIMESTAMP, "address" character varying, "phone" character varying, "email" character varying, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_order_item" ("total" integer NOT NULL, "unitCost" integer NOT NULL, "RecievedQuantity" integer NOT NULL, "orderQuantity" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "purchaseOrderId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_f3eaf81afb216ae78a59cc19503" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "purchase_order" ("totalAmount" integer NOT NULL, "status" character varying, "actualDeliveryDate" TIMESTAMP, "expectedDeliveryDate" TIMESTAMP, "orderDate" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierIdId" uuid, CONSTRAINT "PK_ad3e1c7b862f4043b103a6c8c60" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_item" ADD CONSTRAINT "FK_13ef910b84865fed2a2799dea55" FOREIGN KEY ("purchaseOrderId") REFERENCES "purchase_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_item" ADD CONSTRAINT "FK_3064ddc2f33fbc5b09f53cee561" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order" ADD CONSTRAINT "FK_9f1ffa721889c32b52ee6001476" FOREIGN KEY ("supplierIdId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchase_order" DROP CONSTRAINT "FK_9f1ffa721889c32b52ee6001476"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_item" DROP CONSTRAINT "FK_3064ddc2f33fbc5b09f53cee561"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchase_order_item" DROP CONSTRAINT "FK_13ef910b84865fed2a2799dea55"`,
    );
    await queryRunner.query(`DROP TABLE "purchase_order"`);
    await queryRunner.query(`DROP TABLE "purchase_order_item"`);
    await queryRunner.query(`DROP TABLE "supplier"`);
  }
}
