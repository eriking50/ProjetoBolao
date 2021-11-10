import { PalpiteDto } from "../@types/dtos/palpiteDto";

export interface IApostaService {
    gerarApostas(usuarioId: number, numeroRodada: number, palpites: PalpiteDto[]): Promise<void>; 
}