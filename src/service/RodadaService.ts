import { Rodada } from "../models/RodadaEntity";
import BrasileiraoClient from "../clients/BrasileiraoClient";
import { RodadaResponse } from "../@types/dtos/brasileicaoClientDTO";
import { IRodadaRepository } from "../repositories/IRodadaRepository";
import { Campeonato } from "../models/CampeonatoEntity";
import { IPartidaService } from "./IPartidaService";

export class RodadaService {
    constructor(
        private brasileiraoClient: BrasileiraoClient,
        private rodadaRepository: IRodadaRepository,
        private partidaService: IPartidaService
        ) {}

    async gerarRodadas(campeonato: Campeonato): Promise<void> {
        try {
            const rodadas = await this.buscarDadosRodadaAPI(campeonato);
            await this.rodadaRepository.save(rodadas)
        } catch (error) {
            throw new Error(`Erro ao gerar rodadas: Motivo ${error.message}`);
        }
    }

    private async buscarDadosRodadaAPI(campeonato: Campeonato): Promise<Rodada[]> {
        try {
            const dadosCampeonato = await this.brasileiraoClient.getDadosCampeonatoAPI(campeonato.idCampeonatoApiExterna);
            const rodadasPromiseAPI = dadosCampeonato.map(rodada => {
                return this.brasileiraoClient.getRodadasAPI(rodada.rodada, campeonato.idCampeonatoApiExterna);
            });
            const rodadasDaApi = await Promise.all(rodadasPromiseAPI);

            const rodadasPromiseBD = rodadasDaApi.map(rodada => {
                return this.rodadasFactory(rodada, campeonato);
            }, this);

            const rodadas = await Promise.all(rodadasPromiseBD);
            return rodadas;
        } catch (error) {
            throw new Error(`Erro ao buscar rodadas na API. Motivo ${error.message}`);
        }
    }

    private async atualizarRodada(rodadaResponse: RodadaResponse, rodada: Rodada): Promise<Rodada> {
        if (rodada.status !== rodadaResponse.status) {
            rodada.status = rodadaResponse.status;
        }
        if (rodada.nome !== rodadaResponse.nome) {
            rodada.nome = rodadaResponse.nome;
        }
        if (rodada.rodada !== rodadaResponse.rodada) {
            rodada.rodada = rodadaResponse.rodada;
        }
        const partidaPromise = rodadaResponse.partidas.map(partida => {
            return this.partidaService.partidasFactory(partida)
        }, this)

        rodada.partidas = await Promise.all(partidaPromise);

        return rodada
    }

    private async rodadasFactory(rodadaResponse: RodadaResponse, campeonato: Campeonato): Promise<Rodada> {
        try {
            const rodadaBD = await this.rodadaRepository.findBySlug(rodadaResponse.slug);
            if (rodadaBD) {
                return this.atualizarRodada(rodadaResponse, rodadaBD);
            }

            const rodada = new Rodada();
            rodada.nome = rodadaResponse.nome;
            rodada.slug = rodadaResponse.slug;
            rodada.status = rodadaResponse.status;
            rodada.rodada = rodadaResponse.rodada;
            rodada.campeonato = campeonato;

            const partidasPromise = rodadaResponse.partidas.map(partida => {
                return this.partidaService.partidasFactory(partida)
            }, this);

            rodada.partidas = await Promise.all(partidasPromise);
            return rodada;
        } catch (error) {
            throw new Error(`Erro ao gerar rodada. Motivo ${error.message}`);
        }
    }

}