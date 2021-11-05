import { Campeonato } from "models/CampeonatoEntity";
import { CampeonatoDTO } from "../@types/dtos/campeonatoDTO";

export interface ICampeonatoService {
    criar(dadosCampeonato: CampeonatoDTO): Promise<CampeonatoDTO>;
    buscarCampeonato(slug: string): Promise<Campeonato>;
    atualizarDadosCampeonato(campeonato: Campeonato): Promise<void>;
}