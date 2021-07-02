import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUpdateAtUserTable1625234724313 implements MigrationInterface {
    name = 'ChangeUpdateAtUserTable1625234724313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updated_at`");
        await queryRunner.query("ALTER TABLE `user` ADD `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updated_at`");
        await queryRunner.query("ALTER TABLE `user` ADD `updated_at` date NULL");
    }

}
