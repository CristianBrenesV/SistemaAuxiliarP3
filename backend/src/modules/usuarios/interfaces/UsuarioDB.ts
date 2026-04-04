export interface UsuarioDB {
  IdUsuario: number;
  Usuario: string;
  NombreUsuario: string;
  ApellidoUsuario: string;
  CorreoElectronico: string;
  Estado: string;
  Roles?: string;
}