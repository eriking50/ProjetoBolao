import { PartidaResponse } from "clients/BrasileiraoClient";
import { Partida } from "models/PartidaEntity";


export interface IPartidaService {
    partidasFactory(partidaResponse: PartidaResponse): Promise<Partida>;
}