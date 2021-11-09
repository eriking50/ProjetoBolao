export interface ITimeService {
    atualizarDadosDosTimes(idCampeonato: number): Promise<void>;
}