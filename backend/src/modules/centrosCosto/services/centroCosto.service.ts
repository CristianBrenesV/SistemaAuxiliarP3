import { pool } from '../../../config/db';

export const listarCentrosCosto = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT IdCentroCosto, Codigo, Nombre, Descripcion, Estado
      FROM catalogocentroscostos
      ORDER BY IdCentroCosto DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    const [count]: any = await connection.query(`
      SELECT COUNT(*) as total FROM catalogocentroscostos
    `);

    return {
      data: rows,
      total: count[0].total,
      page,
      totalPages: Math.ceil(count[0].total / limit)
    };

  } finally {
    connection.release();
  }
};

export const crearCentroCosto = async (data: any) => {
  const connection = await pool.getConnection();

  try {
    const { codigo, nombre, descripcion, estado } = data;

    const [result]: any = await connection.query(`
      INSERT INTO catalogocentroscostos
      (Codigo, Nombre, Descripcion, Estado)
      VALUES (?, ?, ?, ?)
    `, [codigo, nombre, descripcion, estado]);

    return result.insertId;

  } finally {
    connection.release();
  }
};

export const obtenerCentroCosto = async (id: number) => {
  const [rows]: any = await pool.query(`
    SELECT * FROM catalogocentroscostos
    WHERE IdCentroCosto = ?
  `, [id]);

  return rows[0];
};

export const actualizarCentroCosto = async (id: number, data: any) => {
  const connection = await pool.getConnection();

  try {
    const { codigo, nombre, descripcion, estado } = data;

    await connection.query(`
      UPDATE catalogocentroscostos
      SET Codigo = ?, Nombre = ?, Descripcion = ?, Estado = ?
      WHERE IdCentroCosto = ?
    `, [codigo, nombre, descripcion, estado, id]);

  } finally {
    connection.release();
  }
};

export const eliminarCentroCosto = async (id: number) => {
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT COUNT(*) as total
      FROM asientodetallecentrocosto
      WHERE IdCentroCosto = ?
    `, [id]);

    if (rows[0].total > 0) {
      throw new Error('No se puede eliminar, tiene registros asociados');
    }

    await connection.query(`
      DELETE FROM catalogocentroscostos
      WHERE IdCentroCosto = ?
    `, [id]);

  } finally {
    connection.release();
  }
};