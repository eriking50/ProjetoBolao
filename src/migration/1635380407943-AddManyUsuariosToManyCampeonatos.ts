import {MigrationInterface, QueryRunner} from "typeorm";

export class AddManyUsuariosToManyCampeonatos1635380407943 implements MigrationInterface {
    name = 'AddManyUsuariosToManyCampeonatos1635380407943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`campeonato_usuarios_usuario\` (\`campeonatoId\` int NOT NULL, \`usuarioId\` int NOT NULL, INDEX \`IDX_5bf389a50c738bbac9daa5b3fa\` (\`campeonatoId\`), INDEX \`IDX_17f4a8fb97b4e5e57a7aa961b8\` (\`usuarioId\`), PRIMARY KEY (\`campeonatoId\`, \`usuarioId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`campeonato_usuarios_usuario\` ADD CONSTRAINT \`FK_5bf389a50c738bbac9daa5b3fa8\` FOREIGN KEY (\`campeonatoId\`) REFERENCES \`campeonato\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`campeonato_usuarios_usuario\` ADD CONSTRAINT \`FK_17f4a8fb97b4e5e57a7aa961b8d\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campeonato_usuarios_usuario\` DROP FOREIGN KEY \`FK_17f4a8fb97b4e5e57a7aa961b8d\``);
        await queryRunner.query(`ALTER TABLE \`campeonato_usuarios_usuario\` DROP FOREIGN KEY \`FK_5bf389a50c738bbac9daa5b3fa8\``);
        await queryRunner.query(`DROP INDEX \`IDX_17f4a8fb97b4e5e57a7aa961b8\` ON \`campeonato_usuarios_usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_5bf389a50c738bbac9daa5b3fa\` ON \`campeonato_usuarios_usuario\``);
        await queryRunner.query(`DROP TABLE \`campeonato_usuarios_usuario\``);
    }

}
