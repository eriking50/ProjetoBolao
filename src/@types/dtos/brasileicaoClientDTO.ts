
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