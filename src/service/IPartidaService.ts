import { PartidaResponse } from "../@types/dtos/brasileicaoClientDTO";
import { Partida } from "models/PartidaEntity";


export interface IPartidaService {
    gerarPartida(partidaResponse: PartidaResponse): Promise<Partida>;
}