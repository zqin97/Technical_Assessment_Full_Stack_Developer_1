import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedItemTableMigration1735911981349
  implements MigrationInterface
{
  name = "AddedItemTableMigration1735911981349";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`item\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(500) NOT NULL, \`description\` varchar(500) NULL, \`price\` decimal(10,2) NOT NULL, \`created_at\` bigint NOT NULL, \`updated_at\` bigint NULL, \`deleted_at\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`item\``);
  }
}
