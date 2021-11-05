import { ITimeRepository } from "../repositories/ITimeRepository";
import BrasileiraoClient, { TimeResponse } from "../clients/BrasileiraoClient";
import { Time } from "../models/TimeEntity";
import { ITimeService } from "./ITimeService";

export class TimeService implements ITimeService {
    constructor(
        private timeRepository: ITimeRepository,
        private brasileiraoClient: BrasileiraoClient
        ) {}

    async buscarTime(nome: string): Promise<Time> {
        try {
            return await this.timeRepository.findByNome(nome);
        } catch (error) {
            throw new Error(`Erro ao buscar dados dos times no banco. Motivo ${error.message}`);
        }
    }

    async criarTimes(idCampeonato: number): Promise<void> {
        try {
            const tabelaResponse = await this.brasileiraoClient.getTabelaAPI(idCampeonato);
            const tabelaPromise = tabelaResponse.map(({time}) => {
                return this.timesFactory(time);
            }, this)
            const times = await Promise.all(tabelaPromise);

            const timesNaoCadastradosPromise = times.map(timeNaoCadastrado => {
                return this.timeRepository.save(timeNaoCadastrado);
            }, this)

            Promise.all(timesNaoCadastradosPromise);
            return;
        } catch (error) {
            throw new Error(`Erro ao criar times. Motivo ${error.message}`);
        }
    }

    private atualizarTime(timeResponse: TimeResponse, time: Time): Time {
        if (timeResponse.nome_popular !== time.nome) {
            time.nome = timeResponse.nome_popular;
        }
        if (timeResponse.sigla !== time.sigla) {
            time.sigla = timeResponse.sigla;
        }
        return time;
    }

    private async timesFactory(timeResponse: TimeResponse): Promise<Time> {
        try {
            const timeBD = await this.buscarTime(timeResponse.nome_popular);
            if (timeBD) {
                return this.atualizarTime(timeResponse, timeBD);
            }

            const time = new Time();
            time.nome = timeResponse.nome_popular;
            time.escudo = timeResponse.escudo;
            time.sigla = timeResponse.sigla;
            return time;
        } catch (error) {
            throw new Error(`Erro ao gerar time. Motivo ${error.message}`);
        }
    }
}
