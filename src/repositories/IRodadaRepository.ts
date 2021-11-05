import { Rodada } from "../models/RodadaEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IRodadaRepository {
    getRodadaBySlug(slug: string): Promise<Rodada>;
    update(id: number, partida: QueryDeepPartialEntity<Rodada>): Promise<UpdateResult>;
    save(rodada: Rodada[]): Promise<Rodada>;
}