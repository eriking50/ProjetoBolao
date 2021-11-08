import { Campeonato } from "models/CampeonatoEntity";
import { Rodada } from "models/RodadaEntity";

export interface IRodadaService {
    gerarRodadas(campeonato: Campeonato): Promise<void>;
    buscarRodadaByNumero(numeroRodada: number): Promise<Rodada>
}