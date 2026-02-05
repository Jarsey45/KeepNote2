import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1770292962769 implements MigrationInterface {
    name = 'Migration1770292962769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_friends" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_51a013006936cbbbd732ec84162" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1796d3b9337fa86e5bdbd307ae" ON "user_friends" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e8d702b68626619d732c1268f" ON "user_friends" ("userId_2") `);
        await queryRunner.query(`CREATE TABLE "user_shared_notes" ("userId" uuid NOT NULL, "noteId" uuid NOT NULL, CONSTRAINT "PK_8d490068415094525e45e63d03e" PRIMARY KEY ("userId", "noteId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de1f9c8c910221835d65d72a3f" ON "user_shared_notes" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_493dfaa2b4d17243c8071ee012" ON "user_shared_notes" ("noteId") `);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_1796d3b9337fa86e5bdbd307aeb" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_0e8d702b68626619d732c1268f1" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_shared_notes" ADD CONSTRAINT "FK_de1f9c8c910221835d65d72a3f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_shared_notes" ADD CONSTRAINT "FK_493dfaa2b4d17243c8071ee0125" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_shared_notes" DROP CONSTRAINT "FK_493dfaa2b4d17243c8071ee0125"`);
        await queryRunner.query(`ALTER TABLE "user_shared_notes" DROP CONSTRAINT "FK_de1f9c8c910221835d65d72a3f8"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_0e8d702b68626619d732c1268f1"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_1796d3b9337fa86e5bdbd307aeb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_493dfaa2b4d17243c8071ee012"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de1f9c8c910221835d65d72a3f"`);
        await queryRunner.query(`DROP TABLE "user_shared_notes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e8d702b68626619d732c1268f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1796d3b9337fa86e5bdbd307ae"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
    }

}
