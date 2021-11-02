import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEndereco1635378328701 implements MigrationInterface {
    name = 'CreateEndereco1635378328701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`endereco\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cep\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`endereco\``);
    }

}
