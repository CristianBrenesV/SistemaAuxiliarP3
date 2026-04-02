import { pool } from '../../config/db';

export const registrarBitacora = async (
  idUsuario: number,
  descripcion: string,
  acciones: any
) => {
  try {
    await pool.query(
      'CALL sp_BitacoraInsertar(?, ?, ?)',
      [
        idUsuario || 0,
        descripcion,
        JSON.stringify(acciones)
      ]
    );
  } catch (error) {
    console.error('Error al registrar bitácora:', error);
  }
};