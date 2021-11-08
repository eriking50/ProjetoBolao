import BrasileiraoClient from "../clients/BrasileiraoClient";
import { RodadaRepository } from "../repositories/RodadaRepository";
import { RodadaService } from "../service/RodadaService";
import { Connection } from "typeorm";
import { TimeRepository } from "../repositories/TimeRepository";
import { TimeService } from "../service/TimeService";
import { PartidaService } from "../service/PartidaService";
import { PartidaRepository } from "../repositories/PartidaRepository";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { ApostaService } from "../service/ApostaService";
import { ApostaRepository } from "../repositories/ApostaRepository";
import { PalpiteDto } from "../@types/dtos/palpiteDto";

export const criarApostas = async (connection: Connection) => {
    const brasileiraoClient = new BrasileiraoClient();
    const rodadaRepo = connection.getCustomRepository(RodadaRepository);
    const partidaRepo = connection.getCustomRepository(PartidaRepository);
    const timeRepo = connection.getCustomRepository(TimeRepository);
    const apostaRepo = connection.getCustomRepository(ApostaRepository);

    const timesService = new TimeService(timeRepo, brasileiraoClient);
    const partidaService = new PartidaService(partidaRepo, timesService);
    const rodadaService = new RodadaService(brasileiraoClient, rodadaRepo, partidaService);

    const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
    const usuarioService = new UsuarioService(usuarioRepo);
    const apostaService = new ApostaService(apostaRepo, usuarioRepo, partidaService, rodadaService);

    const usuarioLogado = await usuarioService.autenticar({
        email: "erik@email.com",
        senha: "alguma_senha"
    });

    const palpites: PalpiteDto[] = [{
        partidaID: 1,
        golsMandante: 1,
        golsVisitante: 3
    }, 
    {
        partidaID: 2,
        golsMandante: 2,
        golsVisitante: 1
    },
    {
        partidaID: 3,
        golsMandante: 1,
        golsVisitante: 1
    }]

    const usuario = await usuarioRepo.findByEmail(usuarioLogado.email);

    await apostaService.criarApostas(usuario.id, 1, palpites);

};