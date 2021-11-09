import { EntityRepository, Repository } from "typeorm";
import { Campeonato } from "../models/CampeonatoEntity";
import { ICampeonatoRespository } from "./ICampeonatoRepository";

@EntityRepository(Campeonato)
export class CampeonatoRepository extends Repository<Campeonato> implements ICampeonatoRespository{
    findBySlug(slug: string): Promise<Campeonato> {
        return this.findOne(slug);
    }

    findById(id: number) {
        return this.findOne(id);
    }
}