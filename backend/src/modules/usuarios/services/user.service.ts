import { pool } from '../../../config/db';
import { RowDataPacket } from 'mysql2';
import { UsuarioDB } from '../interfaces/UsuarioDB';
import { Usuario } from '../interfaces/Usuario';

const mapUsuario = (u: UsuarioDB): Usuario => ({
  idUsuario: u.IdUsuario,
  usuario: u.Usuario,
  nombreUsuario: u.NombreUsuario,
  apellidoUsuario: u.ApellidoUsuario,
  correoElectronico: u.CorreoElectronico,
  estado: u.Estado,
  roles: u.Roles ? u.Roles.split(', ') : []
});

export const listarUsuarios = async (
  limit: number,
  offset: number
): Promise<Usuario[]> => {
  const [rows] = await pool.query<RowDataPacket[][]>(
    'CALL sp_UsuariosListar10(?, ?)',
    [limit, offset]
  );

  const data = rows[0] as UsuarioDB[];

  return data.map(mapUsuario);
};

export const obtenerUsuarioPorId = async (
  id: number
): Promise<Usuario> => {
  const [rows] = await pool.query<RowDataPacket[][]>(
    'CALL sp_UsuariosListarPorIdUsuario(?)',
    [id]
  );

  const data = rows[0]?.[0] as UsuarioDB | undefined;

  if (!data) {
    throw new Error('Usuario no encontrado');
  }

  return mapUsuario(data);
};

export const contarUsuarios = async (): Promise<number> => {
  const [rows] = await pool.query<RowDataPacket[][]>(
    'CALL sp_UsuariosConteo()'
  );

  const total = rows[0]?.[0] as { Total: number } | undefined;

  return total?.Total ?? 0;
};

export const insertarUsuario = async (data: {
  usuario: string;
  claveCifrada: Buffer;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoElectronico: string;
  tag: Buffer;
  nonce: Buffer;
  estado: string;
}): Promise<void> => {
  await pool.query(
    'CALL sp_UsuariosInsertar(?, ?, ?, ?, ?, ?, ?, ?, @resultado, @idUsuario)',
    [
      data.usuario,
      data.claveCifrada,
      data.nombreUsuario,
      data.apellidoUsuario,
      data.correoElectronico,
      data.tag,
      data.nonce,
      data.estado
    ]
  );
};

export const actualizarUsuario = async (
  id: number,
  data: {
    usuario: string;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoElectronico: string;
    estado: string;
  }
): Promise<number> => {
  await pool.query('SET @resultado = 0;');

  await pool.query(
    'CALL sp_UsuariosActualizarPorIdUsuario(?,?,?,?,?,?,@resultado,@idUsuario)',
    [
      id,
      data.usuario,
      data.nombreUsuario,
      data.apellidoUsuario,
      data.correoElectronico,
      data.estado
    ]
  );

  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT @resultado as resultado'
  );

  return rows[0]?.resultado ?? 0;
};

export const eliminarUsuario = async (id: number): Promise<number> => {
  await pool.query('SET @resultado = 0;');

  await pool.query(
    'CALL sp_UsuariosEliminarPorIdUsuario(?, @resultado)',
    [id]
  );

  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT @resultado as resultado'
  );

  return rows[0]?.resultado ?? 0;
};

export const cambiarEstado = async (
  id: number,
  estado: string
): Promise<void> => {
  await pool.query('CALL sp_CambiarEstadoUsuario(?, ?)', [id, estado]);
};

export const cambiarClave = async (
  id: number,
  claveCifrada: Buffer,
  tag: Buffer,
  nonce: Buffer
): Promise<void> => {
  await pool.query('CALL sp_CambiarClaveUsuario(?, ?, ?, ?)', [
    id,
    claveCifrada,
    tag,
    nonce
  ]);
};