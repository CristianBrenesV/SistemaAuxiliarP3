import { pool } from '../../../config/db';

export const listarRoles = async (limit: number, offset: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_RolesListar10(?, ?)',
    [limit, offset]
  );

  return rows[0];
};

export const obtenerRolPorId = async (id: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_RolesListarPorIdRol(?)',
    [id]
  );

  return rows[0][0];
};

export const contarRoles = async () => {
  const [rows]: any = await pool.query('CALL sp_RolesConteo()');
  return rows[0][0].Total;
};

export const insertarRol = async (rol: any) => {
  await pool.query(
    'CALL sp_RolesInsertar(?, ?, ?, ?, @resultado)',
    [rol.idRol, rol.nombreRol, rol.descripcion, rol.estado]
  );
};

export const actualizarRol = async (id: string, rol: any) => {
  await pool.query(
    'CALL sp_RolesActualizarPorIdRol(?, ?, ?, ?, @resultado)',
    [id, rol.nombreRol, rol.descripcion, rol.estado]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};

export const eliminarRol = async (id: string) => {
  await pool.query(
    'CALL sp_RolesEliminarPorIdRol(?, @resultado)',
    [id]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};