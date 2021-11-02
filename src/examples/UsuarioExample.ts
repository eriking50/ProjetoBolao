import { Connection } from "typeorm";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UsuarioService } from "../service/UsuarioService";
import { AutenticaUsuarioDTO, UsuarioDTO } from "../@types/dtos/usuarioDto";

export const autenticaUsuario = async (connection: Connection) => {
  const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
  const usuarioService = new UsuarioService(usuarioRepo);

  const dadosUsuario: AutenticaUsuarioDTO = {
    email: 'paulo@rarolabs.com.br',
    senha: 'minha senha super segura'
  };

  const result = await usuarioService.autenticar(dadosUsuario);
  console.log('========= result', result);
  return result;
};

export const criaUsuario = async (connection: Connection) => {
  const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
  const usuarioService = new UsuarioService(usuarioRepo);

  const dadosUsuario: UsuarioDTO = {
    nome: 'paulo henrique',
    email: 'paulo@rarolabs.com.br',
    senha: 'minha senha super segura'
  };

  const result = await usuarioService.criar(dadosUsuario);
  console.log('========= result', result);
};

export const alteraUsuario = async (connection: Connection) => {
  const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
  const usuarioService = new UsuarioService(usuarioRepo);

  const usuario = await autenticaUsuario(connection);
  const dadosUsuario: UsuarioDTO = {
    nome: 'outro nome',
    email: 'outro-nome@rarolabs.com.br',
    senha: 'estou tentando alterar minha senha'
  };

  await usuarioService.alterar(usuario.id, dadosUsuario);
};

export const alteraSenha = async (connection: Connection) => {
  const usuarioRepo = connection.getCustomRepository(UsuarioRepository);
  const usuarioService = new UsuarioService(usuarioRepo);

  const usuario = await autenticaUsuario(connection);
  await usuarioService.alterarSenha(
    usuario.id,
    'minha senha super segura',
    'Uma-Senh4-m@is-segura-ainda!'
  );
};