import { Campeonato } from "models/CampeonatoEntity";

export interface ICampeonatoRespository {
    save(campeonato: Campeonato): Promise<Campeonato>;
    findByidCampeonatoApiExterna(idCampeonatoApiExterna: number): Promise<Campeonato>;
    findById(id: number): Promise<Campeonato>;
}