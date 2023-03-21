import { MigrationInterface, QueryRunner } from "typeorm"

export class BlogsUpdate1679298109473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "blog" RENAME COLUMN "name" TO "title"')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "blog" RENAME COLUMN "title" TO "name"')
    }


}
