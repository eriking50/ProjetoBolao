import { PartidaResponse } from "../@types/dtos/brasileicaoClientDTO";
import { Partida } from "models/PartidaEntity";


export interface IPartidaService {
    partidasFactory(partidaResponse: PartidaResponse): Promise<Partida>;
}