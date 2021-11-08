import { RodadaRepository } from "../repositories/RodadaRepository";
import { Connection } from "typeorm";
import { PartidaRepository } from "../repositories/PartidaRepository";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { ApostaService } from "../service/ApostaService";
import { ApostaRepository } from "../repositories/ApostaRepository";
import { PalpiteDto } from "../@types/dtos/palpiteDto";

export const criarApostas = async (connection: Connection) => {
    const rodadaRepo = connection.getCustomRepository(RodadaRepository);
    const partidaRepo = connection.getCustomRepository(PartidaRepository);
    const apostaRepo = connection.getCustomRepository(ApostaRepository);
    const usuarioRepo = connection.getCustomRepository(UsuarioRepository);

    const usuarioService = new UsuarioService(usuarioRepo);
    const apostaService = new ApostaService(apostaRepo, usuarioRepo, partidaRepo, rodadaRepo);

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