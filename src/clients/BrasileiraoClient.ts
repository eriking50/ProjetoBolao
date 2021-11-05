import axios from "axios"

const URL_BRASILEIRAO = "https://us-central1-small-talk-3972f.cloudfunctions.net/v1/v1/campeonatos/";

export type TimeResponse = {
    time_id: number,
    nome_popular: string,
    sigla: string,
    escudo: string,
}

export type TabelaResponse = {
    posicao: number,
    pontos: number,
    time: TimeResponse,
    jogos: number,
    vitorias: number,
    empates: number,
    derrotas: number,
    gols_pro: number,
    gols_contra: number,
    saldo_gols: number,
    aproveitamento: number,
    variacao_posicao: number,
    ultimos_jogos: string[]
}

type DadosRodada = {
    nome: string,
    slug: string,
    rodada: number,
    status: string,
}

type Campeonato = {
    campeonato_id: 10,
    nome: string,
    slug: string
}

type Estadio = {
    estadio_id: number,
    nome_popular: string
}

export type PartidaResponse = {
    partida_id: number,
    campeonato: Campeonato,
    placar: string,
    time_mandante: TimeResponse,
    time_visitante: TimeResponse,
    placar_mandante: number,
    placar_visitante: number,
    status: string,
    slug: string,
    data_realizacao: string,
    hora_realizacao: string,
    data_realizacao_iso: Date
    estadio: Estadio;
    _link: string;
}

export type RodadaResponse = {
    nome: string,
    slug: string,
    rodada: number,
    status: string,
    proxima_rodada: DadosRodada,
    rodada_anterior: DadosRodada,
    partidas: PartidaResponse[],
    _link: string
}

export type CampeonatoResponse = {
    nome: string,
    slug: string,
    rodada: number,
    status: string,
    rodada_anterior: DadosRodada,
    proxima_rodada: DadosRodada,
    _link: string
}

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