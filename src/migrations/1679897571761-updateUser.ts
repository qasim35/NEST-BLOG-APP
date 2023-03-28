import { MigrationInterface, QueryRunner } from "typeorm"

export class updateUser1679897571761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const {User} = require('../users/entities/users.entity').User
        await queryRunner.query(`ALTER TABLE ${User} RENAME COLUMN "password" TO "key"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
