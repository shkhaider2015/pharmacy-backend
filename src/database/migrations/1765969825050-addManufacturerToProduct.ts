import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManufacturerToProduct1765969825050
  implements MigrationInterface
{
  name = 'AddManufacturerToProduct1765969825050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" ADD "manufacturerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "sell_order" DROP COLUMN "discountPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order" ADD "discountPrice" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_19c34064fd37743758cff5b403e" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_19c34064fd37743758cff5b403e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order" DROP COLUMN "discountPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sell_order" ADD "discountPrice" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "manufacturerId"`,
    );
  }
}
