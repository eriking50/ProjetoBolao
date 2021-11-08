import { Aposta } from "../models/ApostaEntity";
import { EntityRepository, Repository } from "typeorm";
import { IApostaRepository } from "./IApostaRepository";

@EntityRepository(Aposta)
export class ApostaRepository extends Repository<Aposta> implements IApostaRepository {
    findbyUsuarioAndPartida(usuarioId: number, partidaId: number): Promise<Aposta> {
        return this.findOne({
            where: {
                usuario: usuarioId,
                partida: partidaId
            }
        });
    }
    findbyUsuario(usuarioId: number): Promise<Aposta[]> {
        return this.find({ where: { usuario: usuarioId } });
    }

}