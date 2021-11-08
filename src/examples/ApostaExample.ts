import { RodadaRepository } from "../repositories/RodadaRepository";
import { Connection } from "typeorm";
import { PartidaRepository } from "../repositories/PartidaRepository";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { ApostaService } from "../service/ApostaService";
import { ApostaRepository } from "../repositories/ApostaRepository";
import { PalpiteDto } from "../@types/dtos/palpiteDto";
import { UsuarioDTO } from "../@types/dtos/usuarioDto";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EnderecoService } from "../service/EnderecoService";
import { AxiosHttpClient } from "../infra/http/AxiosHttpClient";
import { EnderecoClient } from "../clients/EnderecoClient";

export const criarApostas = async (connection: Connection) => {
    const httpClient = new AxiosHttpClient();
    const enderecoClient = new EnderecoClient(httpClient);
    

    const rodadaRepo = connection.getCustomRepository(RodadaRepository);
    const partidaRepo = connection.getCustomRepository(PartidaRepository);
    const apostaRepo = connection.getCustomRepository(ApostaRepository);
    const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
    const enderecoRepo = connection.getCustomRepository(EnderecoRepository);

    const usuarioService = new UsuarioService(usuarioRepo);
    const enderecoService = new EnderecoService(enderecoRepo, enderecoClient);
    const apostaService = new ApostaService(apostaRepo, usuarioRepo, partidaRepo, rodadaRepo);

    const dadosUsuario: UsuarioDTO = {
        nome: 'Erik',
        email: "erik@email.com",
        senha: "alguma_senha",
    };

    const endereco = await enderecoService.buscarCep("33943390", "168");
    await usuarioService.criar(dadosUsuario, endereco);
    const usuarioBD = await usuarioRepo.findByEmail("erik@email.com")
    await enderecoService.adicionarUsuario(usuarioBD, "33943390");

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