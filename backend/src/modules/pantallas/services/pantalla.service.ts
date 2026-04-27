import {pool} from '../../../config/db';

export const listarPantallas = async (limit: number, offset: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_PantallasListar10(?, ?)',
    [limit, offset]
  );

  return rows[0];
};

export const obtenerPantallaPorId = async (id: number) => {
  const [rows]: any = await pool.query(
    'CALL sp_PantallasListarPorIdPantalla(?)',
    [id]
  );

  return rows[0][0];
};

export const contarPantallas = async () => {
  const [rows]: any = await pool.query('CALL sp_PantallasConteo()');
  return rows[0][0].Total;
};

export const insertarPantalla = async (pantalla: any) => {
  await pool.query(
    'CALL sp_PantallasInsertar(?, ?, ?, ?, @resultado)',
    [
      pantalla.nombre,
      pantalla.descripcion,
      pantalla.ruta,
      pantalla.estado
    ]
  );
};

export const actualizarPantalla = async (id: number, pantalla: any) => {
  await pool.query(
    'CALL sp_PantallasActualizarPorIdPantalla(?, ?, ?, ?, ?, @resultado)',
    [
      id,
      pantalla.nombre,
      pantalla.descripcion,
      pantalla.ruta,
      pantalla.estado
    ]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};

export const eliminarPantalla = async (id: number) => {
  await pool.query(
    'CALL sp_PantallasEliminarPorIdPantalla(?, @resultado)',
    [id]
  );

  const [res]: any = await pool.query('SELECT @resultado as resultado');
  return res[0].resultado;
};