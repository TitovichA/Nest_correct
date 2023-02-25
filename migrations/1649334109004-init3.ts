import {MigrationInterface, QueryRunner} from "typeorm";

export class init31649334109004 implements MigrationInterface {
    name = 'init31649334109004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "cover" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "newsId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" UNIQUE ("value"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_98082dbb08817c9801e32dd015" ON "role" ("value") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d443082eccd5198f95f2a36e2" ON "users" ("login") `);
        await queryRunner.query(`CREATE INDEX "IDX_0adc0a8834ea0f252e96d154de" ON "users" ("full_name") `);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_232f8e85d7633bd6ddfad421696" UNIQUE ("token"), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30e98e8746699fb9af235410af" ON "session" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_232f8e85d7633bd6ddfad42169" ON "session" ("token") `);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b23c65e50a758245a33ee35fda1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles_role" ("usersId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_3fb5295f0482f3c5090b41a5427" PRIMARY KEY ("usersId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3ea8bcae76ff0b74bcc1340af8" ON "users_roles_role" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_03c652226fd376f26b31503d40" ON "users_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_role" ADD CONSTRAINT "FK_3ea8bcae76ff0b74bcc1340af86" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_role" ADD CONSTRAINT "FK_03c652226fd376f26b31503d40c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles_role" DROP CONSTRAINT "FK_03c652226fd376f26b31503d40c"`);
        await queryRunner.query(`ALTER TABLE "users_roles_role" DROP CONSTRAINT "FK_3ea8bcae76ff0b74bcc1340af86"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03c652226fd376f26b31503d40"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3ea8bcae76ff0b74bcc1340af8"`);
        await queryRunner.query(`DROP TABLE "users_roles_role"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_232f8e85d7633bd6ddfad42169"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30e98e8746699fb9af235410af"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0adc0a8834ea0f252e96d154de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d443082eccd5198f95f2a36e2"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98082dbb08817c9801e32dd015"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
