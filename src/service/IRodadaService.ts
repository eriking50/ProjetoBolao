import { Campeonato } from "models/CampeonatoEntity";

export interface IRodadaService {
    gerarRodadasCampeonato(idCampeonato: number, campeonato: Campeonato): Promise<void>;
}