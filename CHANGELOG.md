## UNRELASED

### Adicionados
[Usuario]
- Fluxo de usuários criado pelo Paulo
- Alterado função de criar usuário para receber um endereço e atribuir a usuário
- Adicionado função que adiciona um campeonato ao usuário

[Endereco]
- Criado interface para Repositório de Endereço com os métodos:
    - findbyCep(cepFind: string) Promise<Endereco>
    - save(endereco: Endereco): Promise<Endereco>
- Criado Repositório de Endereço que implementa a interface
- Criado interface para Service de Endereço com os métodos:
    - buscarCep(cep: string, numero: string): Promise<Endereco>
- Criado Service de Endereço que implementa a interface
    - E possui a função privada: factoryEndereco(enderecoDTO: EnderecoDTO, numero: string): Endereco
- Criado testes para EnderecoService
- Adicionado ao arquivo .env campo para API de busca de CEP:
    - BASE_API_CEP
- Criado _EnderecoDTO_ com os seguintes campos:
    - cep [string]
    - logradouro [string]
    - complemento [string]
    - bairro [string]
    - localidade [string]
    - uf [string]
    - ibge [string]
    - gia [string]
    - ddd [string]
    - siafi [string]

[Campeonato]
- Criado interface para Repositório de Campeonato com os métodos:
    - save(campeonato: Campeonato): Promise<Campeonato>
    - findBySlug(slugFind: string): Promise<Campeonato>
    - findById(id: number): Promise<Campeonato>
    - update(id: number, partida: QueryDeepPartialEntity<Campeonato>): Promise<UpdateResult>
- Criado Repositório de Campeonato que implementa a interface
- Criado interface para Service de Campeonato com os métodos:
    - gerarCampeonato(dadosCampeonato: CampeonatoDTO): Promise<CampeonatoDTO>
    - atualizarDadosCampeonato(campeonato: Campeonato): Promise<void>
- Criado Service de Campeonato que implementa a interface
- Criado testes para CampeonatoService
- Criado _campeonatoDTO_ com os seguintes campos:
    - id? [number]
    - nome [string]
    - slug [string]
    - nomePopular [string]
    - status [string]
    - logo [string]
    - idCampeonatoApiExterna [number]

[Rodada]
- Criado interface para Repositório de Rodada com os métodos:
    - findBySlug(slug: string): Promise<Rodada>
    - findByNumeroRodada(numeroRodada: number): Promise<Rodada>
    - update(id: number, partida: QueryDeepPartialEntity<Rodada>): Promise<UpdateResult>
    - save(rodada: Rodada[]): Promise<Rodada>
- Criado Repositório de Rodada que implementa a interface
- Criado interface para Service de Rodada com os métodos:
    - gerarRodadas(campeonato: Campeonato): Promise<void>
- Criado Service de Rodada que implementa a interface
- Criado testes para RodadaService

[Partida]
- Criado interface para Repositório de Partida com os métodos:
    - findbySlug(slugFind: string): Promise<Partida>
    - findbyRodadaId(numeroRodada: number): Promise<Partida[]>
    - update(id: number, partida: QueryDeepPartialEntity<Partida>): Promise<UpdateResult>
- Criado Repositório de Partida que implementa a interface
- Criado interface para Service de Partida com os métodos:
    - gerarPartida(partidaResponse: PartidaResponse): Promise<Partida>
- Criado Service de Partida que implementa a interface
- Criado testes para PartidaService

[Time]
- Criado interface para Repositório de Time com os métodos:
    - findByNome(nome: string): Promise<Time>
    - save(time: Time[]): Promise<Time[]>
- Criado Repositório de Time que implementa a interface
- Criado interface para Service de Time com os métodos:
    - gerarTimes(idCampeonato: number): Promise<void>
- Criado Service de Time que implementa a interface
- Criado testes para TimeService

[Aposta]
- Criado interface para Repositório de Aposta com os métodos:
    - findbyUsuario(usuarioId: number): Promise<Aposta[]>
    - findbyUsuarioAndPartida(usuarioId: number, partidaId: number): Promise<Aposta>
    - save(aposta: Aposta): Promise<Aposta>
    - update(id: number, partida: QueryDeepPartialEntity<Aposta>): Promise<UpdateResult>
- Criado Repositório de Aposta que implementa a interface
- Criado interface para Service de Aposta com os métodos:
    - criarApostas(usuarioId: number, numeroRodada: number, palpites: PalpiteDto[]): Promise<void>
- Criado Service de Aposta que implementa a interface
- Criado testes para ApostaService
- Criado _palpiteDTO_ com os sequintes campos:
    - partidaID [number]
    - golsMandante [number]
    - golsVisitante [number]

[BrasileiraoClient]
- Criado arquivo de client que busca de uma API externa dados do brasileirão
- Adicionado ao arquivo .env campo para a API do brasileirão e token:
    - URL_BRASILEIRAO
    - TOKEN
- Criado arquivo com os DTOs usados por esse client
    - _TimeDTO_ com os seguintes campos:
        - time_id [number]
        - nome_popular [string]
        - sigla [string]
        - escudo [string]
    - _TabelaDTO_ com os seguintes campos:
        - posicao [number]
        - pontos [number]
        - time [TimeDTO]
        - jogos [number]
        - vitorias [number]
        - empates [number]
        - derrotas [number]
        - gols_pro [number]
        - gols_contra [number]
        - saldo_gols [number]
        - aproveitamento [number]
        - variacao_posicao [number]
        - ultimos_jogos [string[]]
    - _PartidaDTO_ com os seguintes campos:
        - partida_id [number]
        - campeonato [Campeonato]
        - placar [string]
        - time_mandante [TimeDTO]
        - time_visitante [TimeDTO]
        - placar_mandante [number]
        - placar_visitante [number]
        - status [string]
        - slug [string]
        - data_realizacao [string]
        - hora_realizacao [string]
        - data_realizacao_iso [Date]
        - estadio [Estadio]
        - _link [string]
    - _RodadaDTO_ com os seguintes campos:
        - nome [string]
        - slug [string]
        - rodada [number]
        - status [string]
        - proxima_rodada [DadosRodada]
        - rodada_anterior [DadosRodada]
        - partidas [PartidaDTO[]]
        - _link [string]
    - _CampeonatoDTO_ com os seguintes campos:
        - nome [string]
        - slug [string]
        - rodada [number]
        - status [string]
        - rodada_anterior [DadosRodada]
        - proxima_rodada [DadosRodada]
        - _link [string]