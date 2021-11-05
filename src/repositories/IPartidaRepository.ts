import { Partida } from "../models/PartidaEntity";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IPartidaRepository {
    findbyStatus(statusFind: string): Promise<Partida[]>
    findbySlug(slugFind: string): Promise<Partida>;
    update(id: number, partida: QueryDeepPartialEntity<Partida>): Promise<UpdateResult>;
}