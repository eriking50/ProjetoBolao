import { TabelaResponse, RodadaResponse, CampeonatoResponse } from "../@types/dtos/brasileicaoClientDTO";
import axios from "axios"

const URL_BRASILEIRAO = "https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/";

export default class BrasileiraoClient {

    public async getTabelaAPI(idCampeonato: number): Promise<TabelaResponse[]> {
        try {
            const tabela = await axios.get<TabelaResponse[]>(`${URL_BRASILEIRAO}/${idCampeonato}/tabela`, {
                headers: {Authorization: `bearer ${process.env.TOKEN}`},
            });
            return tabela.data;
        } catch (error) {
            throw new Error(`Falha ao buscar times na API. Motivo: ${error.message}`);
        }
    }

    public async getRodadasAPI(numeroRodada: number, idCampeonato: number): Promise<RodadaResponse> {
        try {
            const response = await axios.get<RodadaResponse>(`${URL_BRASILEIRAO}/${idCampeonato}/rodadas/${numeroRodada}`, {
                headers: {Authorization: `bearer ${process.env.TOKEN}`},
            });
            return response.data;
        } catch (error) {
            throw new Error("Falha ao buscar detalhes da rodada na API.");
        }
    }

    public async getDadosCampeonatoAPI(idCampeonato: number): Promise<CampeonatoResponse[]> {
        try {
            const campeonatoResponse = await axios.get<CampeonatoResponse[]>(`${URL_BRASILEIRAO}/${idCampeonato}/rodadas/`, {
                headers:{Authorization: `bearer ${process.env.TOKEN}`}
            });
            
            return campeonatoResponse.data;
        } catch (error) {
            throw new Error(`Falha ao buscar dados sobre o campeonato na API. Motivo ${error.message}`);
        }
    }
}

export { BrasileiraoClient }