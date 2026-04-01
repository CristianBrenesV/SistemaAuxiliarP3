import { pool } from '../../config/db';

export const VerificarPorUsuario = async (usuario: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_VerificarCredencial(?)',
    [usuario]
  );

  return rows[0][0]; 
};