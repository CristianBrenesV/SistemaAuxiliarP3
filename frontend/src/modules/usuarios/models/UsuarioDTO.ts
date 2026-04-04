export interface CrearUsuarioDTO {
  usuario: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoElectronico: string;
  clave: string;
  estado: string;
}

export interface ActualizarUsuarioDTO {
  usuario: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoElectronico: string;
  estado: string;
}

export interface UsuarioFormProps {
  initialData?: Partial<CrearUsuarioDTO>;
  onSubmit: (data: CrearUsuarioDTO) => void;
}