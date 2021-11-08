import { EnderecoClient } from "clients/EnderecoClient";
import { Usuario } from "models/UsuarioEntity";
import { EnderecoDTO } from "../@types/dtos/api-cep/EnderecoDTO";
import { Endereco } from "../models/EnderecoEntity";
import { IEnderecoRepository } from "../repositories/IEnderecoRepository";

export class EnderecoService {
    constructor(
        private enderecoRepository: IEnderecoRepository,
        private enderecoCliente: EnderecoClient
        ) {}

    async buscarCep(cep: string, numero: string): Promise<Endereco> {
        const enderecoDB = await this.enderecoRepository.findbyCep(cep);
        if (enderecoDB) {
            return enderecoDB;
        }
        const enderecoAPI = await this.enderecoCliente.buscaEnderecoPorCep(cep);
        const enderecoParaBD = this.factoryEndereco(enderecoAPI, numero);

        return await this.enderecoRepository.save(enderecoParaBD);
    }

    async adicionarUsuario(usuario: Usuario, cep: string): Promise<Endereco> {
        const enderecoDB = await this.enderecoRepository.findbyCep(cep);
        if (enderecoDB) {
            enderecoDB.usuario = usuario;
            await this.enderecoRepository.save(enderecoDB);
        }
        return;
    }

    private factoryEndereco(enderecoDTO: EnderecoDTO, numero: string): Endereco {
        const endereco = new Endereco();
        endereco.bairro = enderecoDTO.bairro;
        endereco.cep = enderecoDTO.cep.replace("-", "");
        endereco.logradouro = enderecoDTO.logradouro;
        endereco.estado = enderecoDTO.uf;
        endereco.numero = numero;

        return endereco
    }

}