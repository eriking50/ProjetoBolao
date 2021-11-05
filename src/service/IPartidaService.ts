import { PartidaResponse } from "clients/BrasileiraoClient";
import { Partida } from "models/PartidaEntity";


export interface IPartidaService {
    atualizarResultado(partida: Partida): Promise<void>;
    buscarPartidaByStatus(status: string): Promise<Partida[]>;
    partidasFactory(partidaResponse: PartidaResponse): Promise<Partida>;
}