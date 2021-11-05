import { Partida } from "../models/PartidaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IPartidaRepository } from "./IPartidaRepository";

@EntityRepository(Partida)
export class PartidaRepository extends Repository<Partida> implements IPartidaRepository {

    async findbySlug(slugFind: string): Promise<Partida> {
        return this.findOne({ where: { slug: slugFind } });
    }
}