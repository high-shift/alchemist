import { MigrationInterface, QueryRunner } from 'typeorm';

export class Integration1636074206709 implements MigrationInterface {
    name = 'Integration1636074206709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `integration` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `type` varchar(255) NOT NULL DEFAULT \'ifood\', `status` varchar(255) NOT NULL DEFAULT \'active\', `accountId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `integration` ADD CONSTRAINT `FK_80e6cffdf7e741037acf8a8c1a1` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `integration` DROP FOREIGN KEY `FK_80e6cffdf7e741037acf8a8c1a1`');
        await queryRunner.query('DROP TABLE `integration`');
    }

}
