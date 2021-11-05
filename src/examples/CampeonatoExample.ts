import BrasileiraoClient from "../clients/BrasileiraoClient";
import { CampeonatoRepository } from "../repositories/CampeonatoRepository";
import { RodadaRepository } from "../repositories/RodadaRepository";
import { CampeonatoService } from "../service/CampeonatoService";
import { RodadaService } from "../service/RodadaService";
import { Connection } from "typeorm";
import { TimeRepository } from "../repositories/TimeRepository";
import { TimeService } from "../service/TimeService";

export const criarCampeonato = async (connection: Connection) => {
    const brasileiraoClient = new BrasileiraoClient();
    const rodadaRepo = connection.getCustomRepository(RodadaRepository);
    const campeonatoRepo = connection.getCustomRepository(CampeonatoRepository);
    const timeRepo = connection.getCustomRepository(TimeRepository);

    const rodadaService = new RodadaService(brasileiraoClient, rodadaRepo, timeRepo);
    const timesService = new TimeService(timeRepo, brasileiraoClient);
    const campeonatoService = new CampeonatoService(campeonatoRepo, timesService, rodadaService);
    
    const dadosCampeonato = {
        nome: "Campeonato Brasileiro",
        slug: "brasileirão-2021",
        nomePopular: "Brasileirão",
        status: "algum status",
        logo: "BRLOGO",
        idCampeonatoApiExterna: 10,
    }
    
    await campeonatoService.criar(dadosCampeonato);
};