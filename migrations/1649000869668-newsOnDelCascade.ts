import {MigrationInterface, QueryRunner} from "typeorm";

export class newsOnDelCascade1649000869668 implements MigrationInterface {
    name = 'newsOnDelCascade1649000869668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_86fb3a1330e43f9767b3b6df238" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
