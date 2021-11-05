## UNRELASED

### Adicionados
[Usuario]
- Fluxo de usuários criado pelo Paulo

[Campeonato]
- Criado interface para repositório de campeonato com os métodos:
    - save
    - findBySlug
    - findById
- Criado Repositório de campeonato que implementa a interface
- Criado interface para service de campeonato com os métodos:
    - criar
    - buscarCampeonato
    - atualizarDadosCampeonato
- Criado Service de campeonato que implementa a interface

[Rodada]
- Criado interface para repositório de rodada com os métodos:
    - save
    - findBySlug
    - update
- Criado Repositório de rodada que implementa a interface
- Criado interface para service de rodada com os métodos:
    - gerarRodadas
- Criado Service de rodada que implementa a interface

[Partida]
- Criado interface para repositório de partida com os métodos:
    - findbySlug
    - update
- Criado Repositório de partida que implementa a interface
- Criado interface para service de partida com os métodos:
    - partidasFactory
- Criado Service de partida que implementa a interface

[Time]
- Criado interface para repositório de time com os métodos:
    - findbySlug
    - update
- Criado Repositório de time que implementa a interface
- Criado interface para service de time com os métodos:
    - atualizarDadosDosTimes
    - buscarTime
- Criado Service de time que implementa a interface