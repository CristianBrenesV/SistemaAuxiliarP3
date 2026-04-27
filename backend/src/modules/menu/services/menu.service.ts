import {pool} from '../../../config/db';

export const obtenerMenuPorRol = async (rol: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_MenuPorRol(?)',
    [rol]
  );

  return rows[0];
};