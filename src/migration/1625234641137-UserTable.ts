import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1625234641137 implements MigrationInterface {
    name = 'UserTable1625234641137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `phone_number` varchar(255) NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'active', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` date NULL, `newsletter` tinyint NULL, `accepted_terms` tinyint NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
