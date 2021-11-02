import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aposta } from "./ApostaEntity";
import { Rodada } from "./RodadaEntity";
import { Time } from "./TimeEntity";

@Entity()
export class Partida {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        nullable: false,
        length: 50 
    })
    placar: string;

    @ManyToOne(() => Time, time => time.partida)
    mandante: number;

    @ManyToOne(() => Time, time => time.partida)
    visitante: number;

    @Column({ 
        nullable: false 
    })
    placarMandante: number;

    @Column({ 
        nullable: false 
    })
    placarVisitante: number;

    @Column({ 
        nullable: false,
        length: 50 
    })
    status: string;

    @Column({ 
        nullable: false,
        length: 50 
    })
    slug: string;

    @Column({ 
        nullable: false 
    })
    dataRealizacao: Date;

    @OneToMany(() => Aposta, aposta => aposta.partida)
    apostas: Aposta[];

    @ManyToOne(() => Rodada, rodada => rodada.partidas)
    rodada: Rodada;
}