import { Connection } from 'typeorm';
import {
  criaUsuario,
  autenticaUsuario,
  alteraUsuario,
  alteraSenha
} from './UsuarioExample';
import { buscaEnderecoPeloCep } from './EnderecoExample';
import { atualizarCampeonato, criarCampeonato } from './CampeonatoExample';
import { criarApostas } from './ApostaExample';

export const runner = async (connection: Connection) => {
  // await buscaEnderecoPeloCep();
  // await criarCampeonato(connection);
  // await atualizarCampeonato(connection);
  await criarApostas(connection);
  // await criaUsuario(connection);
  // await autenticaUsuario(connection);
  // await alteraUsuario(connection);
  // await alteraSenha(connection);
}; 