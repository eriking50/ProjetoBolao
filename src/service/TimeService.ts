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
        return await this.timeRepository.findByNome(nome);
    }

    async criarTimes(idCampeonato: number): Promise<void> {
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
    }
    
    private async timesFactory(timeResponse: TimeResponse): Promise<Time> {
        const timeBD = await this.buscarTime(timeResponse.nome_popular);
        let time: Time;

        if (timeBD) {
            time = timeBD
        } else {
            time = new Time();
            time.nome = timeResponse.nome_popular;
            time.escudo = timeResponse.escudo;
            time.sigla = timeResponse.sigla;
        }
        
        return time;
    }
}
