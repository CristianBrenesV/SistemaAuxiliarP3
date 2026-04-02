import { pool } from '../../config/db';

export const listarUsuarios = async (limit: number, offset: number) => {
  const [rows]: any = await pool.query('CALL sp_UsuariosListar10(?, ?)', [limit, offset]);
  return rows[0];
};

export const contarUsuarios = async () => {
  const [rows]: any = await pool.query('CALL sp_UsuariosConteo()');
  return rows[0][0].Total;
};

export const insertarUsuario = async (data: any) => {
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

export const actualizarUsuario = async (id: number, data: any) => {
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

  const [rows]: any = await pool.query('SELECT @resultado as resultado');
  return rows[0].resultado;
};

export const eliminarUsuario = async (id: number) => {
  await pool.query('SET @resultado = 0;');
  await pool.query('CALL sp_UsuariosEliminarPorIdUsuario(?, @resultado)', [id]);

  const [rows]: any = await pool.query('SELECT @resultado as resultado');
  return rows[0].resultado;
};

export const cambiarEstado = async (id: number, estado: string) => {
  await pool.query('CALL sp_CambiarEstadoUsuario(?, ?)', [id, estado]);
};

export const cambiarClave = async (id: number, claveCifrada: Buffer, tag: Buffer, nonce: Buffer) => {
  await pool.query('CALL sp_CambiarClaveUsuario(?, ?, ?, ?)', [
    id,
    claveCifrada,
    tag,
    nonce
  ]);
};