import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAposta1635379428675 implements MigrationInterface {
    name = 'CreateAposta1635379428675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`aposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`placar\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`aposta\``);
    }

}
