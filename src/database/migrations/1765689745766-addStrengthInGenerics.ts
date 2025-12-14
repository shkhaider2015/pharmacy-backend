import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStrengthInGenerics1765689745766 implements MigrationInterface {
  name = 'AddStrengthInGenerics1765689745766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // --- Step 1: Add column as NULLABLE first ---
    await queryRunner.query(
      `ALTER TABLE "generics" ADD "strength" character varying`,
    );

    // --- Step 2: Update existing rows with a default value ---
    // You must provide a value here for all existing rows
    // Use a value that makes sense for your data, like 'N/A' or '0mg'
    await queryRunner.query(
      `UPDATE "generics" SET "strength" = 'N/A' WHERE "strength" IS NULL`,
    );

    // --- Step 3: Alter the column to enforce NOT NULL constraint ---
    await queryRunner.query(
      `ALTER TABLE "generics" ALTER COLUMN "strength" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "generics" DROP COLUMN "strength"`);
  }
}
