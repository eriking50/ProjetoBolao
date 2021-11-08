import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
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
    length: 500 
  })
  hashSenha: string;

  @Column({
    nullable: false,
    default: true
  })
  ativo: boolean;

  @OneToOne(() => Endereco, endereco => endereco.usuario, { cascade: true })
  @JoinColumn()
  endereco: Endereco;

  @OneToMany(() => Aposta, aposta => aposta.usuario)
  apostas: Aposta[];
  
  @ManyToMany(() => Campeonato, campeonato => campeonato.usuarios)
  @JoinTable()
  campeonatos: Campeonato[];

  adicionarCampeonato(campeonato: Campeonato) {
    if (!this.campeonatos) {
      this.campeonatos = [];
    }
    this.campeonatos.push(campeonato);
  }
}
