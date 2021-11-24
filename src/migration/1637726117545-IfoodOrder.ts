import {MigrationInterface, QueryRunner} from "typeorm";

export class IfoodOrder1637726117545 implements MigrationInterface {
    name = 'IfoodOrder1637726117545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ifood_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`origin\` varchar(255) NOT NULL DEFAULT 'ifood', \`orderId\` varchar(255) NOT NULL, \`merchantId\` varchar(255) NOT NULL, \`customerId\` varchar(255) NOT NULL, \`customerName\` varchar(255) NOT NULL, \`customerPhone\` varchar(255) NOT NULL, \`items\` text NOT NULL, \`payments\` text NOT NULL, \`integrationId\` int NULL, UNIQUE INDEX \`REL_2de504a136b466983b0a0e024a\` (\`integrationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ifood_order\` ADD CONSTRAINT \`FK_2de504a136b466983b0a0e024aa\` FOREIGN KEY (\`integrationId\`) REFERENCES \`integration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ifood_order\` DROP FOREIGN KEY \`FK_2de504a136b466983b0a0e024aa\``);
        await queryRunner.query(`DROP INDEX \`REL_2de504a136b466983b0a0e024a\` ON \`ifood_order\``);
        await queryRunner.query(`DROP TABLE \`ifood_order\``);
    }

}
