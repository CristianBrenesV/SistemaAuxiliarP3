import { pool } from '../../../config/db';

export const listarPeriodos = async () => {
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT 
        IdPeriodo,
        Anio,
        Mes,
        Estado
      FROM periodocontable
      ORDER BY Anio DESC, Mes DESC
    `);

    return rows;

  } finally {
    connection.release();
  }
};