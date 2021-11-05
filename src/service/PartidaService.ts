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

    async atualizarResultado(partida: Partida): Promise<void> {
        await this.partidaRepository.update(partida.id, partida);
        return;
    }
    
    async buscarPartidaByStatus(status: string): Promise<Partida[]> {
        return this.partidaRepository.findbyStatus(status);
    }

    async partidasFactory(partidaResponse: PartidaResponse): Promise<Partida> {
        const partidaBD = await this.partidaRepository.findbySlug(partidaResponse.slug);
        let partida: Partida;
        if (partidaBD) {
            partida = partidaBD;
        } else {
            partida = new Partida();
            partida.slug = partidaResponse.slug;
            partida.status = partidaResponse.status;
            partida.dataRealizacao = new Date(`${partidaResponse.data_realizacao_iso}`);
            
            const mandante = await this.timeService.buscarTime(partidaResponse.time_mandante.nome_popular);
            partida.mandante = mandante;
            
            const visitante = await this.timeService.buscarTime(partidaResponse.time_visitante.nome_popular);
            partida.visitante = visitante;
        }
        
        partida.placar = partidaResponse.placar;
        if (partidaResponse.status === 'finalizado') {
            partida.placarMandante = partidaResponse.placar_mandante;
            partida.placarVisitante = partidaResponse.placar_visitante;
        }
        return partida;
    }
}