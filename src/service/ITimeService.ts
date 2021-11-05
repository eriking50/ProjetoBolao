import { TimeResponse } from "clients/BrasileiraoClient";
import { Time } from "models/TimeEntity";

export interface ITimeService {
    criarTimes(idCampeonato: number): Promise<void>;
}