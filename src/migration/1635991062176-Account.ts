import {MigrationInterface, QueryRunner} from "typeorm";

export class Account1635991062176 implements MigrationInterface {
    name = 'Account1635991062176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`type\` varchar(255) NOT NULL DEFAULT 'active', UNIQUE INDEX \`IDX_414d4052f22837655ff312168c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_414d4052f22837655ff312168c\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
