import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./UsuarioEntity";

@Entity()
export class Aposta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  data: Date;

  @Column({ nullable: false })
  placar: string;

  @ManyToOne(() => Usuario, usuario => usuario.apostas)
  usuario: Usuario;
}