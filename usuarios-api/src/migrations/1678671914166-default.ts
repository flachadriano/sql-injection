import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678671914166 implements MigrationInterface {
    name = 'default1678671914166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("codigo" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "codigo_cargo" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("codigo", "nome", "sobrenome", "codigo_cargo") SELECT "codigo", "nome", "sobrenome", "codigo_cargo" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuarios" ("codigo" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" text NOT NULL, "sobrenome" text, "codigo_cargo" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_usuarios"("codigo", "nome", "sobrenome", "codigo_cargo") SELECT "codigo", "nome", "sobrenome", "codigo_cargo" FROM "usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuarios" RENAME TO "usuarios"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("codigo" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "codigo_cargo" integer)`);
        await queryRunner.query(`INSERT INTO "usuarios"("codigo", "nome", "sobrenome", "codigo_cargo") SELECT "codigo", "nome", "sobrenome", "codigo_cargo" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME TO "temporary_usuarios"`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("codigo" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "codigo_cargo" integer)`);
        await queryRunner.query(`INSERT INTO "usuarios"("codigo", "nome", "sobrenome", "codigo_cargo") SELECT "codigo", "nome", "sobrenome", "codigo_cargo" FROM "temporary_usuarios"`);
        await queryRunner.query(`DROP TABLE "temporary_usuarios"`);
    }

}
