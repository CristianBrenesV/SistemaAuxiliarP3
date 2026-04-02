import { pool } from '../../config/db';

export const VerificarPorUsuario = async (usuario: string) => {
  const [rows]: any = await pool.query(
    'CALL sp_VerificarCredencial(?)',
    [usuario]
  );

  return rows[0][0]; 
};

export const registrarIntentoFallido = async (usuario: string): Promise<number> => {

  await pool.query('SET @resultado = 0');
  await pool.query('CALL sp_RegistrarIntentoFallido(?, @resultado)', [usuario]);
  
  const [rows]: any = await pool.query('SELECT @resultado as resultado');
  return rows[0].resultado ?? 0;
};

export const reiniciarIntentos = async (usuario: string): Promise<void> => {
  await pool.query('CALL sp_ReiniciarIntentos(?)', [usuario]);
};