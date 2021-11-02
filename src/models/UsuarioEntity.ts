import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany } from "typeorm";
import { Endereco } from "./EnderecoEntity";
import { Aposta } from "./ApostaEntity";
import { Campeonato } from "./CampeonatoEntity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ 
    nullable: false,
    length: 50 
  })
  nome: string;

  @Column({ 
    unique: true,
    length: 50 
  })
  email: string;
  
  @Column({ 
    nullable: false,
    length: 50 
  })
  hashSenha: string;

  @OneToOne(() => Endereco, endereco => endereco.usuario)
  endereco: Endereco;

  @OneToMany(() => Aposta, aposta => aposta.usuario)
  apostas: Aposta[];

  @ManyToMany(() => Campeonato, campeonato => campeonato.usuarios)
  campeonatos: Campeonato[];
}
