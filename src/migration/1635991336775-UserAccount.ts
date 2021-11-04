import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAccount1635991336775 implements MigrationInterface {
    name = 'UserAccount1635991336775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`accountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_68d3c22dbd95449360fdbf7a3f\` (\`accountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\` (\`accountId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_68d3c22dbd95449360fdbf7a3f1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_68d3c22dbd95449360fdbf7a3f1\``);
        await queryRunner.query(`DROP INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_68d3c22dbd95449360fdbf7a3f\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accountId\``);
    }

}
