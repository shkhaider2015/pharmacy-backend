import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBatch1766382976069 implements MigrationInterface {
  name = 'CreateBatch1766382976069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "batch" ("currentQuantity" integer NOT NULL, "initialQuantity" integer NOT NULL, "expiryDate" TIMESTAMP NOT NULL, "manufacturerDate" TIMESTAMP, "batchNumber" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "batch"`);
  }
}
