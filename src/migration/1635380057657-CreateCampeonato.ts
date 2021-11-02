import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCampeonato1635380057657 implements MigrationInterface {
    name = 'CreateCampeonato1635380057657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`campeonato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`campeonato\``);
    }

}
