import { Usuario } from "../models/UsuarioEntity";
import { EntityRepository, Repository } from "typeorm";
import { IUsuarioRepository } from "./IUsuarioRepository";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> implements IUsuarioRepository {
  findByEmail(email: string): Promise<Usuario> {
    return this.findOne({
      relations: ['campeonatos'],
      where: { email }
    });
  }

  findById(id: number) {
    return this.findOne(id);
  }
}