import { Campeonato } from "models/CampeonatoEntity";

export interface ICampeonatoRespository {
    save(campeonato: Campeonato): Promise<Campeonato>;
    findBySlug(slugFind: string): Promise<Campeonato>;
    findById(id: number): Promise<Campeonato>;
}