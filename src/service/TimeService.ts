import BrasileiraoClient, { TimeResponse } from "../clients/BrasileiraoClient";
import { Time } from "../models/TimeEntity";
import { TimeRepository } from "../repositories/TimeRepository";
import { ITimeService } from "./ITimeService";

export class TimeService implements ITimeService {
    constructor(
        private timeRepository: TimeRepository,
        private brasileiraoClient: BrasileiraoClient
        ) {}

    async criarTimes(idCampeonato: number): Promise<void> {
        const tabelaResponse = await this.brasileiraoClient.getTabelaAPI(idCampeonato);
        const tabelaPromise = tabelaResponse.map(({time}) => {
            return this.timesFactory(time);
        })
        
        Promise.all(tabelaPromise);
        return;
    }
    
    private async timesFactory(timeResponse: TimeResponse): Promise<void> {
        const time = new Time();
        const timeBD = await this.timeRepository.findByNome(time.nome);
        if (timeBD) {
            return;
        }
        time.nome = timeResponse.nome_popular;
        time.escudo = timeResponse.escudo;
        time.sigla = timeResponse.sigla;
        await this.timeRepository.save(time);
        return;
    }
}
