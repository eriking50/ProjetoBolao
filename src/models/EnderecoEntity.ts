import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @OneToOne(() => Usuario, usuario => usuario.endereco)
  @JoinColumn()
  usuario: Usuario;
}