import { Connection } from 'typeorm';
import {
  criaUsuario,
  autenticaUsuario,
  alteraUsuario,
  alteraSenha
} from './UsuarioExample';
import { buscaEnderecoPeloCep } from './EnderecoExample';

export const runner = async (connection: Connection) => {
  await buscaEnderecoPeloCep();
  // await criaUsuario(connection);
  // await autenticaUsuario(connection);
  // await alteraUsuario(connection);
  // await alteraSenha(connection);
};