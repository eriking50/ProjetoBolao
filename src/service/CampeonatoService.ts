import { CampeonatoCriadoDTO, CampeonatoDTO } from "../@types/dtos/campeonatoDTO";
import { ICampeonatoRespository } from "../repositories/ICampeonatoRepository";
import { Campeonato } from "../models/CampeonatoEntity";
import { IRodadaService } from "./IRodadaService";
import { ITimeService } from "./ITimeService";

export class CampeonatoService {
    constructor(
        private campeonatoRepository: ICampeonatoRespository,
        private timesService: ITimeService,
        private rodadaService: IRodadaService
        ) {}

    async criar(dadosCampeonato: CampeonatoDTO): Promise<Campeonato> {
        try {
            const campeonatoClasse = await this.campeonatoFactory(dadosCampeonato);
            const campeonatoBD = await this.campeonatoRepository.save(campeonatoClasse);
            return campeonatoBD;
        } catch (error) {
            throw new Error(`Erro ao criar campeonato. Motivo: ${error.message}`);
        }
    }
    
    async buscarCampeonato(slug: string): Promise<Campeonato> {
        return await this.campeonatoRepository.findBySlug(slug);
    }
    
    async atualizarDadosCampeonato(campeonato: Campeonato): Promise<void> {
        try {
            await this.timesService.atualizarDadosDosTimes(campeonato.idCampeonatoApiExterna);
            await this.rodadaService.gerarRodadas(campeonato);
        } catch (error) {
            throw new Error(`Erro ao atualizar dados do campeonato. Motivo: ${error.message}`);
        }
    }

    private omitIdCampeonato(campeonato: Campeonato): CampeonatoCriadoDTO {
        const {id, ...campeonatoCriado } = campeonato;
        return campeonatoCriado;
    }

    private async campeonatoFactory(dadosCampeonato: CampeonatoDTO): Promise<Campeonato>{
        try {
            const campeonatoBD = await this.campeonatoRepository.findBySlug(dadosCampeonato.slug);
            if (campeonatoBD) {
                return campeonatoBD;
            }

            const campeonato = new Campeonato();
            campeonato.idCampeonatoApiExterna = dadosCampeonato.idCampeonatoApiExterna;
            campeonato.logo = dadosCampeonato.logo;
            campeonato.nome = dadosCampeonato.nome;
            campeonato.nomePopular = dadosCampeonato.nomePopular;
            campeonato.slug = dadosCampeonato.slug;
            campeonato.status = dadosCampeonato.status;
            return campeonato;
        } catch (error) {
            throw new Error(`Erro ao gerar campeonato. Motivo: ${error.message}`);
        }
    }
}