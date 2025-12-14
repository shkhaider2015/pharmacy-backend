import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductCategoryAndGeneric1765640696970
  implements MigrationInterface
{
  name = 'CreateProductCategoryAndGeneric1765640696970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "generics" ("name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_846aa2dd91784461b5edc2891f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("code" character varying, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isPrescriptionRequired" boolean NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products_generics_generics" ("productsId" uuid NOT NULL, "genericsId" uuid NOT NULL, CONSTRAINT "PK_09f5700cf912618994003a978d0" PRIMARY KEY ("productsId", "genericsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_57b691ddea985a58a73a9e869b" ON "products_generics_generics" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4b482046ed83955b0f117ddea5" ON "products_generics_generics" ("genericsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "products_categories_categories" ("productsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products_generics_generics" ADD CONSTRAINT "FK_57b691ddea985a58a73a9e869b5" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_generics_generics" ADD CONSTRAINT "FK_4b482046ed83955b0f117ddea51" FOREIGN KEY ("genericsId") REFERENCES "generics"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_generics_generics" DROP CONSTRAINT "FK_4b482046ed83955b0f117ddea51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_generics_generics" DROP CONSTRAINT "FK_57b691ddea985a58a73a9e869b5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`,
    );
    await queryRunner.query(`DROP TABLE "products_categories_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4b482046ed83955b0f117ddea5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_57b691ddea985a58a73a9e869b"`,
    );
    await queryRunner.query(`DROP TABLE "products_generics_generics"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "generics"`);
  }
}
