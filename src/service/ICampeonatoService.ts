import { CampeonatoDTO } from "../@types/dtos/campeonatoDTO";

export interface ICampeonatoService {
    criar(dadosCampeonato: CampeonatoDTO): Promise<CampeonatoDTO>;
    atualizarResultados()
}