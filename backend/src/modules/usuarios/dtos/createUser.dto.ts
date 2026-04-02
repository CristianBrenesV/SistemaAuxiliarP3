export interface CreateUserDTO {
  usuario: string;
  password: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoElectronico: string;
  estado?: 'Activo' | 'Inactivo' | 'Bloqueado';
}