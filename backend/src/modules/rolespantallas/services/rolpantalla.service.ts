import {pool} from '../../../config/db';

export const listarRolesPantallas = async (limit: number, offset: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_RolesPantallasListar10(?, ?)',
    [limit, offset]
  );

  return rows[0];
};

export const contarRolesPantallas = async () => {
  const [rows]: any = await pool.query('CALL sp_RolesPantallasConteo()');
  return rows[0][0].Total;
};

export const listarPorRol = async (idRol: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_RolesPantallasListarPorIdRol(?)',
    [idRol]
  );

  return rows[0];
};

export const listarPantallasPorRol = async (idRol: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_RolesPantallasListarPantallasPorIdRol(?)',
    [idRol]
  );

  return rows[0];
};

export const listarConEstado = async (idRol: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_RolesPantallasListarConEstado(?)',
    [idRol]
  );

  return rows[0];
};

export const insertarRolPantalla = async (idRol: string, idPantalla: number) => {
  await pool.query(
    'CALL sp_RolesPantallasInsertar(?, ?, @resultado)',
    [idRol, idPantalla]
  );
};

export const eliminarRolPantalla = async (idRol: string, idPantalla: number) => {
  await pool.query(
    'CALL sp_RolesPantallasEliminarPorIdRolIdPantalla(?, ?, @resultado)',
    [idRol, idPantalla]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};

export const actualizarRolPantallas = async (
  idRol: string,
  pantallas: number[]
) => {
  const lista = pantallas.join(',');

  await pool.query(
    'CALL sp_RolesPantallasActualizar(?, ?, @resultado)',
    [idRol, lista]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};