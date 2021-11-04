export interface CampeonatoDTO {
    id?: number,
    nome: string,
    slug: string,
    nomePopular: string,
    status: string,
    logo: string,
    idCampeonatoApiExterna: number,
}

export type CampeonatoCriadoDTO = Omit<CampeonatoDTO, 'id'>;