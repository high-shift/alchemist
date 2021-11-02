import {MigrationInterface, QueryRunner} from "typeorm";

export class User1633863505432 implements MigrationInterface {
    name = 'User1633863505432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" character varying(150) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "phone_number" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "accepted_terms" boolean, CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
