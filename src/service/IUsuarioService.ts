import {
  AlterarUsuarioDTO,
  AutenticaUsuarioDTO,
  RetornoAutenticacao,
  UsuarioCriadoDTO,
  UsuarioDTO
} from "../@types/dtos/usuarioDto";

export interface IUsuarioService {
  criar(dadosUsuario: UsuarioDTO): Promise<UsuarioCriadoDTO>;
  autenticar(dadosUsuario: AutenticaUsuarioDTO): Promise<RetornoAutenticacao>;
  alterar(usuarioId: number, usuarioDTO: AlterarUsuarioDTO): Promise<void>;
  alterarSenha(usuarioid: number, senhaAntiga: string, novaSenha: string): Promise<void>;
  inativar(usuarioId: number): Promise<void>
}
