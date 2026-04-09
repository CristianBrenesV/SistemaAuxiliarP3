import { pool } from '../../../config/db';

export const obtenerDetalles = async (id: number) => {
    const connection = await pool.getConnection();

    try {
        const [rows]: any = await connection.query('CALL sp_AsientoDetalle(?)', [id]);

        return rows[0];

    } finally {
        connection.release();
    }
};

export const listarAsientos = async (
  idPeriodo: number,
  estado?: number,
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;
  const [rows]: any = await pool.query('CALL sp_asientos_listar_filtro(?, ?, ?, ?)', [
    idPeriodo || null,
    estado || null,
    offset,
    limit
  ]);

  const data = rows[0];

  const [countRows]: any = await pool.query('CALL sp_AsientoEncabezadoConteo(?, ?)', [
    idPeriodo || null,
    estado || null
  ]);
  const total = countRows[0][0].total;

  return {
    data,
    page,
    totalPages: Math.ceil(total / limit)
  };
};