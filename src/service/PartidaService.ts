import { PartidaResponse } from "../clients/BrasileiraoClient";
import { Partida } from "../models/PartidaEntity";
import { IPartidaRepository } from "../repositories/IPartidaRepository";
import { IPartidaService } from "./IPartidaService";
import { ITimeService } from "./ITimeService";

export class PartidaService implements IPartidaService {
    constructor(
        private partidaRepository: IPartidaRepository,
        private timeService: ITimeService
        ) {}

    private atualizarPartida(partidaResponse: PartidaResponse, partida: Partida): Partida {
        if (partidaResponse.status !== partida.status) {
            partida.status = partidaResponse.status;
            partida.placarMandante = partidaResponse.placar_mandante;
            partida.placarVisitante = partidaResponse.placar_visitante;
        }
        if (partidaResponse.placar !== partida.placar) {
            partida.placar = partidaResponse.placar;
        }
        if (partidaResponse.data_realizacao_iso.getTime() !== partida.dataRealizacao.getTime()) {
            partida.dataRealizacao = partidaResponse.data_realizacao_iso;
        }
        return partida;
    }

    async partidasFactory(partidaResponse: PartidaResponse): Promise<Partida> {
        try {
            const partidaBD = await this.partidaRepository.findbySlug(partidaResponse.slug);
            if (partidaBD) {
                return this.atualizarPartida(partidaResponse, partidaBD);
            }

            const partida = new Partida();
            partida.slug = partidaResponse.slug;
            partida.status = partidaResponse.status;
            partida.dataRealizacao = new Date(`${partidaResponse.data_realizacao_iso}`);

            const mandante = await this.timeService.buscarTime(partidaResponse.time_mandante.nome_popular);
            partida.mandante = mandante;

            const visitante = await this.timeService.buscarTime(partidaResponse.time_visitante.nome_popular);
            partida.visitante = visitante;
            partida.placar = partidaResponse.placar;

            if (partidaResponse.status === 'finalizado') {
                partida.placarMandante = partidaResponse.placar_mandante;
                partida.placarVisitante = partidaResponse.placar_visitante;
            }
            return partida;
        } catch (error) {
            throw new Error(`Erro ao gerar partida. Motivo: ${error.message}`);
        }
    }
}