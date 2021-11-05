import { EntityRepository, Repository } from "typeorm";
import { Rodada } from "../models/RodadaEntity";
import { IRodadaRepository } from "./IRodadaRepository";

@EntityRepository(Rodada)
export class RodadaRepository extends Repository<Rodada> implements IRodadaRepository {
    getRodadaBySlug(slugFind: string): Promise<Rodada> {
        return this.findOne({ where: { slug: slugFind } });
    }
    getRodadas(): Promise<Rodada[]> {
        return this.find();
    }
    
}