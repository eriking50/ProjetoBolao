import { Partida } from "../models/PartidaEntity";
import { Rodada } from "../models/RodadaEntity";
import { Time } from "../models/TimeEntity";
import { ITimeRepository } from "../repositories/ITimeRepository";
import BrasileiraoClient, { PartidaResponse, RodadaResponse, TimeResponse } from "../clients/BrasileiraoClient";
import { IRodadaRepository } from "../repositories/IRodadaRepository";
import { Campeonato } from "models/CampeonatoEntity";

export class RodadaService {
    constructor(
        private brasileiraoClient: BrasileiraoClient,
        private rodadaRepository: IRodadaRepository,
        private timeRepository: ITimeRepository
        ) {}

    async gerarRodadasCampeonato(idCampeonato: number, campeonato: Campeonato): Promise<void> {
        try {
            const dadosCampeonato = await this.brasileiraoClient.getDadosCampeonatoAPI(idCampeonato);
            const rodadasPromiseAPI = dadosCampeonato.map(rodada => {
                return this.brasileiraoClient.getRodadasAPI(rodada.rodada, idCampeonato);
            });
            const rodadasDaApi = await Promise.all(rodadasPromiseAPI);
    
            const rodadasPromiseBD = rodadasDaApi.map(rodada => {
                return this.rodadasFactory(rodada, campeonato);
            }, this);

            const rodadas = await Promise.all(rodadasPromiseBD);
            await this.rodadaRepository.save(rodadas);
        } catch (error) {
            throw new Error(`Erro ao gerar rodadas no banco de dados: Motivo ${error.message}`);
        }
    }

    private async rodadasFactory(rodadaResponse: RodadaResponse, campeonato: Campeonato): Promise<Rodada> {
        const rodada = new Rodada();
        rodada.nome = rodadaResponse.nome;
        rodada.slug = rodadaResponse.slug;
        rodada.status = rodadaResponse.status;
        rodada.rodada = rodadaResponse.rodada;
        rodada.campeonato = campeonato;
        const partidasPromise = rodadaResponse.partidas.map(partida => {
            return this.partidasFactory(partida)
        }, this);
        rodada.partidas = await Promise.all(partidasPromise);
        return rodada;
    }
    
    private async partidasFactory(partidaResponse: PartidaResponse): Promise<Partida> {
        const partida = new Partida();
        partida.slug = partidaResponse.slug;
        partida.status = partidaResponse.status;
        partida.dataRealizacao = new Date(`${partidaResponse.data_realizacao_iso}`);
        
        const visitante = await this.timeRepository.findByNome(partidaResponse.time_visitante.nome_popular);
        partida.visitante = visitante;
        
        const mandante = await this.timeRepository.findByNome(partidaResponse.time_mandante.nome_popular);
        partida.mandante = mandante;
        
        partida.placar = partidaResponse.placar;
        if (partidaResponse.status === 'finalizado') {
            partida.placarMandante = partidaResponse.placar_mandante;
            partida.placarVisitante = partidaResponse.placar_visitante;
        }
        return partida;
    }
}