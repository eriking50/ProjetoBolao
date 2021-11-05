import { Time } from "models/TimeEntity";

export interface ITimeService {
    criarTimes(idCampeonato: number): Promise<void>;
    buscarTime(nome: string): Promise<Time>;
}