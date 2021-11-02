import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueConstraintToUsuarioEmail1635375574842 implements MigrationInterface {
    name = 'AddUniqueConstraintToUsuarioEmail1635375574842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP INDEX \`IDX_2863682842e688ca198eb25c12\``);
    }

}
