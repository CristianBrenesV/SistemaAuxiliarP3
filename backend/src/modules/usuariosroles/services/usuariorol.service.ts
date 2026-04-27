import {pool} from '../../../config/db';

export const listarUsuariosRoles = async (limit: number, offset: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_UsuariosRolesListar10(?, ?)',
    [limit, offset]
  );

  return rows[0];
};

export const contarUsuariosRoles = async () => {
  const [rows]: any = await pool.query('CALL sp_UsuariosRolesConteo()');
  return rows[0][0].Total;
};

export const listarPorUsuario = async (idUsuario: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_UsuariosRolesListarPorIdUsuario(?)',
    [idUsuario]
  );

  return rows[0];
};

export const listarPorRol = async (idRol: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_UsuariosRolesListarPorIdRol(?)',
    [idRol]
  );

  return rows[0];
};

export const listarRolesPorUsuario = async (idUsuario: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_UsuariosRolesListarRolesPorIdUsuario(?)',
    [idUsuario]
  );

  return rows[0];
};

export const listarRolesActivosPorUsuario = async (idUsuario: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_UsuariosRolesListarRolesActivosPorIdUsuario(?)',
    [idUsuario]
  );

  return rows[0];
};

export const listarUsuariosPorRol = async (idRol: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_UsuariosRolesListarUsuariosPorIdRol(?)',
    [idRol]
  );

  return rows[0];
};

export const insertarUsuarioRol = async (idUsuario: number, idRol: string) => {
  await pool.query(
    'CALL sp_UsuariosRolesInsertar(?, ?, @resultado)',
    [idUsuario, idRol]
  );
};

export const eliminarUsuarioRol = async (idUsuario: number, idRol: string) => {
  await pool.query(
    'CALL sp_UsuariosRolesEliminarPorIdUsuarioIdRol(?, ?, @resultado)',
    [idUsuario, idRol]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};