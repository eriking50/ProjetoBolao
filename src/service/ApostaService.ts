import { PalpiteDto } from "../@types/dtos/palpiteDto";
import { IUsuarioRepository } from "repositories/IUsuarioRepository";
import { IPartidaService } from "./IPartidaService";
import { IRodadaService } from "./IRodadaService";
import { Aposta } from "../models/ApostaEntity";
import { IApostaRepository } from "../repositories/IApostaRepository";

export class ApostaService {
    constructor(
        private apostaRepository: IApostaRepository,
        private usuarioRepository: IUsuarioRepository,
        private partidaService: IPartidaService,
        private rodadaService: IRodadaService,
        ) {}

    async criarApostas(usuarioId: number, numeroRodada: number, palpites: PalpiteDto[]): Promise<void> {
        const usuario = await this.usuarioRepository.findById(usuarioId);
        const rodada = await this.rodadaService.buscarRodadaByNumero(numeroRodada);
        const partidas = await this.partidaService.buscaPartidaByRodada(rodada.id);

        const apostasPromise = palpites.flatMap(palpite => {
            return partidas.map(async partida => {
                const partidaApostada = await this.apostaRepository.findbyUsuarioAndPartida(usuario.id, partida.id);
                if (partidaApostada) {
                    return;
                }

                if (partida.id === palpite.partidaID) {
                    const aposta = new Aposta();
                    aposta.partida = partida;
                    aposta.usuario = usuario;
                    aposta.placarMandante = palpite.golsMandante;
                    aposta.placarVisitante = palpite.golsVisitante;
                    return this.apostaRepository.save(aposta);
                }
            })
        })
        await Promise.all(apostasPromise);
        return;
    }
}