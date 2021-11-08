import {MigrationInterface, QueryRunner} from "typeorm";

export class AtualizacaoParaUsuario1636399679888 implements MigrationInterface {
    name = 'AtualizacaoParaUsuario1636399679888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6f962678dc18e5ec715e370e95\` ON \`usuario\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_82bec04bb9fadadad0a33cb0c43\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`usuarioId\` \`usuarioId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_6f962678dc18e5ec715e370e95e\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`hashSenha\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`hashSenha\` varchar(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`enderecoId\` \`enderecoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`rodada\` DROP FOREIGN KEY \`FK_d2f8c30f140114e3bd1a3c57221\``);
        await queryRunner.query(`ALTER TABLE \`rodada\` CHANGE \`campeonatoId\` \`campeonatoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_3f47fd4c3ccc1dfbd37ffa89aa0\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_73d8623d724d2921ed5a3620a55\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_ed33f0276339f0973c6559d247d\``);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`placarMandante\` \`placarMandante\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`placarVisitante\` \`placarVisitante\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`dataRealizacao\` \`dataRealizacao\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`mandanteId\` \`mandanteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`visitanteId\` \`visitanteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`rodadaId\` \`rodadaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`aposta\` DROP FOREIGN KEY \`FK_e9bff60fe377a9d0a6c05ec67c6\``);
        await queryRunner.query(`ALTER TABLE \`aposta\` DROP FOREIGN KEY \`FK_c792d1284c6b67efbb6060cfdbf\``);
        await queryRunner.query(`ALTER TABLE \`aposta\` CHANGE \`usuarioId\` \`usuarioId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`aposta\` CHANGE \`partidaId\` \`partidaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_82bec04bb9fadadad0a33cb0c43\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_6f962678dc18e5ec715e370e95e\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rodada\` ADD CONSTRAINT \`FK_d2f8c30f140114e3bd1a3c57221\` FOREIGN KEY (\`campeonatoId\`) REFERENCES \`campeonato\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_3f47fd4c3ccc1dfbd37ffa89aa0\` FOREIGN KEY (\`mandanteId\`) REFERENCES \`time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_73d8623d724d2921ed5a3620a55\` FOREIGN KEY (\`visitanteId\`) REFERENCES \`time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_ed33f0276339f0973c6559d247d\` FOREIGN KEY (\`rodadaId\`) REFERENCES \`rodada\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`aposta\` ADD CONSTRAINT \`FK_e9bff60fe377a9d0a6c05ec67c6\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`aposta\` ADD CONSTRAINT \`FK_c792d1284c6b67efbb6060cfdbf\` FOREIGN KEY (\`partidaId\`) REFERENCES \`partida\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aposta\` DROP FOREIGN KEY \`FK_c792d1284c6b67efbb6060cfdbf\``);
        await queryRunner.query(`ALTER TABLE \`aposta\` DROP FOREIGN KEY \`FK_e9bff60fe377a9d0a6c05ec67c6\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_ed33f0276339f0973c6559d247d\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_73d8623d724d2921ed5a3620a55\``);
        await queryRunner.query(`ALTER TABLE \`partida\` DROP FOREIGN KEY \`FK_3f47fd4c3ccc1dfbd37ffa89aa0\``);
        await queryRunner.query(`ALTER TABLE \`rodada\` DROP FOREIGN KEY \`FK_d2f8c30f140114e3bd1a3c57221\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_6f962678dc18e5ec715e370e95e\``);
        await queryRunner.query(`ALTER TABLE \`endereco\` DROP FOREIGN KEY \`FK_82bec04bb9fadadad0a33cb0c43\``);
        await queryRunner.query(`ALTER TABLE \`aposta\` CHANGE \`partidaId\` \`partidaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`aposta\` CHANGE \`usuarioId\` \`usuarioId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`aposta\` ADD CONSTRAINT \`FK_c792d1284c6b67efbb6060cfdbf\` FOREIGN KEY (\`partidaId\`) REFERENCES \`partida\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`aposta\` ADD CONSTRAINT \`FK_e9bff60fe377a9d0a6c05ec67c6\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`rodadaId\` \`rodadaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`visitanteId\` \`visitanteId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`mandanteId\` \`mandanteId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`dataRealizacao\` \`dataRealizacao\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`placarVisitante\` \`placarVisitante\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` CHANGE \`placarMandante\` \`placarMandante\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_ed33f0276339f0973c6559d247d\` FOREIGN KEY (\`rodadaId\`) REFERENCES \`rodada\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_73d8623d724d2921ed5a3620a55\` FOREIGN KEY (\`visitanteId\`) REFERENCES \`time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partida\` ADD CONSTRAINT \`FK_3f47fd4c3ccc1dfbd37ffa89aa0\` FOREIGN KEY (\`mandanteId\`) REFERENCES \`time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rodada\` CHANGE \`campeonatoId\` \`campeonatoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`rodada\` ADD CONSTRAINT \`FK_d2f8c30f140114e3bd1a3c57221\` FOREIGN KEY (\`campeonatoId\`) REFERENCES \`campeonato\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`enderecoId\` \`enderecoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`hashSenha\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`hashSenha\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_6f962678dc18e5ec715e370e95e\` FOREIGN KEY (\`enderecoId\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`endereco\` CHANGE \`usuarioId\` \`usuarioId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`endereco\` ADD CONSTRAINT \`FK_82bec04bb9fadadad0a33cb0c43\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6f962678dc18e5ec715e370e95\` ON \`usuario\` (\`enderecoId\`)`);
    }

}
