import { BolaoBaseError } from "./BolaoBaseError";

export class CampeonatoJaCadastrado extends Error implements BolaoBaseError {
    public static CODE = 'ER_DUP_ENTRY';

    public name: string;
    constructor() {
        super('Este campeonato já está cadastrado no sistema');
        this.name = 'CampeonatoJaCadastrado';
    }
}
