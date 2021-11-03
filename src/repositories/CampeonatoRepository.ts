import { EntityRepository, Repository } from "typeorm";
import { Campeonato } from "models/CampeonatoEntity";
import { ICampeonatoRespository } from "./ICampeonatoRepository";

@EntityRepository(Campeonato)
export class CampeonatoRepository extends Repository<Campeonato> implements ICampeonatoRespository{
    findByidCampeonatoApiExterna(idCampeonatoApiExterna: number): Promise<Campeonato> {
        return this.findOne({ where: { idCampeonatoApiExterna } });
    }

    findById(id: number) {
        return this.findOne(id);
    }
}