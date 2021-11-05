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

    async criar(dadosCampeonato: CampeonatoDTO): Promise<CampeonatoDTO> {
        try {
            const campeonatoClasse = await this.campeonatoFactory(dadosCampeonato);
            const campeonatoBD = await this.campeonatoRepository.save(campeonatoClasse);
            await this.timesService.criarTimes(dadosCampeonato.idCampeonatoApiExterna);
            await this.rodadaService.gerarRodadas(campeonatoBD);
            return this.omitIdCampeonato(campeonatoBD);
        } catch (error) {
            throw error;
        }
    }

    private omitIdCampeonato(campeonato: Campeonato): CampeonatoCriadoDTO {
        const {id, ...campeonatoCriado } = campeonato;
        return campeonatoCriado;
    }

    private async campeonatoFactory(dadosCampeonato: CampeonatoDTO): Promise<Campeonato>{
        const campeonatoBD = await this.campeonatoRepository.findBySlug(dadosCampeonato.slug);
        let campeonato: Campeonato;
        if (campeonatoBD) {
            campeonato = campeonatoBD;
        } else {
            campeonato = new Campeonato();
            campeonato.idCampeonatoApiExterna = dadosCampeonato.idCampeonatoApiExterna;
            campeonato.logo = dadosCampeonato.logo;
            campeonato.nome = dadosCampeonato.nome;
            campeonato.nomePopular = dadosCampeonato.nomePopular;
            campeonato.slug = dadosCampeonato.slug;
            campeonato.status = dadosCampeonato.status;
        }
        return campeonato;
    }
}