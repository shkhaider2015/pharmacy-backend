import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpiryDateInProducts1765691755101
  implements MigrationInterface
{
  name = 'AddExpiryDateInProducts1765691755101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "expiryDate" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "manufactureDate" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "manufactureDate"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "expiryDate"`);
  }
}
