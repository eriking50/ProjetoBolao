import { Time } from "models/TimeEntity";

export interface ITimeService {
    atualizarDadosDosTimes(idCampeonato: number): Promise<void>;
    buscarTime(nome: string): Promise<Time>;
}