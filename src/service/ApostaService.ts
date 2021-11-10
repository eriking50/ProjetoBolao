import { PalpiteDto } from "../@types/dtos/palpiteDto";
import { IUsuarioRepository } from "repositories/IUsuarioRepository";
import { Aposta } from "../models/ApostaEntity";
import { IApostaRepository } from "../repositories/IApostaRepository";
import { IRodadaRepository } from "../repositories/IRodadaRepository";
import { IPartidaRepository } from "../repositories/IPartidaRepository";
import { IApostaService } from "./IApostaService";

export class ApostaService implements IApostaService {
    constructor(
        private apostaRepository: IApostaRepository,
        private usuarioRepository: IUsuarioRepository,
        private partidaRepository: IPartidaRepository,
        private rodadaRepository: IRodadaRepository,
        ) {}

    async gerarApostas(usuarioId: number, numeroRodada: number, palpites: PalpiteDto[]): Promise<void> {
        const usuario = await this.usuarioRepository.findById(usuarioId);
        const rodada = await this.rodadaRepository.findByNumeroRodada(numeroRodada);
        const usuarioRegistrado = usuario.campeonatos.some(campeonato => campeonato.id === rodada.campeonato.id);

        if (!usuarioRegistrado) {
            throw new Error("O Usuário não está registrado nesse campeonato e não pode fazer apostas");
        }

        const partidas = await this.partidaRepository.findbyRodadaId(rodada.id);

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