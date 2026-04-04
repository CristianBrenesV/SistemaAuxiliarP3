export interface Usuario {
  idUsuario: number;
  usuario: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoElectronico: string;
  estado: string;
  roles: string[];
}