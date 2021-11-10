import { RodadaRepository } from "../repositories/RodadaRepository";
import { Connection } from "typeorm";
import { PartidaRepository } from "../repositories/PartidaRepository";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { ApostaService } from "../service/ApostaService";
import { ApostaRepository } from "../repositories/ApostaRepository";
import { PalpiteDto } from "../@types/dtos/palpiteDto";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";

export const criarApostas = async (connection: Connection) => {
    const rodadaRepo = connection.getCustomRepository(RodadaRepository);
    const partidaRepo = connection.getCustomRepository(PartidaRepository);
    const apostaRepo = connection.getCustomRepository(ApostaRepository);
    const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
    const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);

    const usuarioService = new UsuarioService(usuarioRepo);
    const apostaService = new ApostaService(apostaRepo, usuarioRepo, partidaRepo, rodadaRepo);

    const usuarioBD = await usuarioRepo.findByEmail("erik@email.com");
    const campeonato = await campeonatoRepo.findBySlug("brasileirão-2021");
    usuarioService.adicionarCampeonato(usuarioBD.id, campeonato);

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

    await apostaService.gerarApostas(usuario.id, 1, palpites);

};