import { CampeonatoCriadoDTO, CampeonatoDTO } from "../@types/dtos/campeonatoDTO";
import { ICampeonatoRespository } from "repositories/ICampeonatoRepository";
import { Campeonato } from "models/CampeonatoEntity";
import { CampeonatoJaCadastrado } from "../@types/errors/CampeonatoJaCadastrado";

export class CampeonatoService {
    constructor(private campeonatoRepository: ICampeonatoRespository) {}

    async criar(dadosCampeonato: CampeonatoDTO): Promise<CampeonatoDTO> {
        try {
            const campeonato = this.campeonatoFactory(dadosCampeonato);
            const resultado = await this.campeonatoRepository.save(campeonato);
            return this.omitIdCampeonato(resultado);
        } catch (error) {
            if (error?.code === CampeonatoJaCadastrado.CODE) {
                throw new CampeonatoJaCadastrado();
            }

            throw error;
        }
    }

    private campeonatoFactory(dadosCampeonato: CampeonatoDTO): Campeonato {
        const campeonato = new Campeonato();
        campeonato.idCampeonatoApiExterna = dadosCampeonato.idCampeonatoApiExterna;
        campeonato.logo = dadosCampeonato.logo;
        campeonato.nome = dadosCampeonato.nome;
        campeonato.nomePopular = dadosCampeonato.nomePopular;
        campeonato.slug = dadosCampeonato.slug;
        campeonato.status = dadosCampeonato.status;
        return campeonato;
    }

    private omitIdCampeonato(campeonato: Campeonato): CampeonatoCriadoDTO {
        const {id, ...campeonatoCriado } = campeonato;
        return campeonatoCriado;
    }

    
}