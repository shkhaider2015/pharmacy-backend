import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSellOrder1765967326342 implements MigrationInterface {
  name = 'CreateSellOrder1765967326342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sell_order" ("netPrice" integer NOT NULL, "discountPrice" character varying NOT NULL, "totalPrice" integer NOT NULL, "paymentStatus" character varying NOT NULL, "paymentMethod" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid NOT NULL, CONSTRAINT "PK_48914a9792e5a7ba59c7a449897" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sell_order_products_products" ("sellOrderId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_bbcf0deed5d3db3fcd3bd496fb4" PRIMARY KEY ("sellOrderId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_91d67ca267bee871892725e572" ON "sell_order_products_products" ("sellOrderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f33d4c29d5f6d16559d5289bb3" ON "sell_order_products_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order" ADD CONSTRAINT "FK_d6d65ad29a97d3161a581ae7f77" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order_products_products" ADD CONSTRAINT "FK_91d67ca267bee871892725e5721" FOREIGN KEY ("sellOrderId") REFERENCES "sell_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order_products_products" ADD CONSTRAINT "FK_f33d4c29d5f6d16559d5289bb35" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sell_order_products_products" DROP CONSTRAINT "FK_f33d4c29d5f6d16559d5289bb35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order_products_products" DROP CONSTRAINT "FK_91d67ca267bee871892725e5721"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order" DROP CONSTRAINT "FK_d6d65ad29a97d3161a581ae7f77"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f33d4c29d5f6d16559d5289bb3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_91d67ca267bee871892725e572"`,
    );
    await queryRunner.query(`DROP TABLE "sell_order_products_products"`);
    await queryRunner.query(`DROP TABLE "sell_order"`);
  }
}
