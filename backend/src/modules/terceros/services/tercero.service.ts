import { pool } from '../../../config/db';

// 🔹 LISTAR
export const listarTerceros = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT IdTercero, Identificacion, Nombre, TipoTercero, Email, Telefono, Estado
      FROM catalogoterceros
      ORDER BY IdTercero DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    const [count]: any = await connection.query(`
      SELECT COUNT(*) as total FROM catalogoterceros
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

// 🔹 CREAR
export const crearTercero = async (data: any) => {
  const connection = await pool.getConnection();

  try {
    const { identificacion, nombre, tipo, email, telefono, estado } = data;

    const [result]: any = await connection.query(`
      INSERT INTO catalogoterceros
      (Identificacion, Nombre, TipoTercero, Email, Telefono, Estado)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [identificacion, nombre, tipo, email, telefono, estado]);

    return result.insertId;

  } finally {
    connection.release();
  }
};

// 🔹 OBTENER
export const obtenerTercero = async (id: number) => {
  const [rows]: any = await pool.query(`
    SELECT * FROM catalogoterceros
    WHERE IdTercero = ?
  `, [id]);

  return rows[0];
};

// 🔹 ACTUALIZAR
export const actualizarTercero = async (id: number, data: any) => {
  const connection = await pool.getConnection();

  try {
    const { identificacion, nombre, tipo, email, telefono, estado } = data;

    await connection.query(`
      UPDATE catalogoterceros
      SET Identificacion = ?, Nombre = ?, TipoTercero = ?, Email = ?, Telefono = ?, Estado = ?
      WHERE IdTercero = ?
    `, [identificacion, nombre, tipo, email, telefono, estado, id]);

  } finally {
    connection.release();
  }
};

// 🔹 ELIMINAR (validación)
export const eliminarTercero = async (id: number) => {
  const connection = await pool.getConnection();

  try {
    const [rows]: any = await connection.query(`
      SELECT COUNT(*) as total
      FROM asientodetalletercero
      WHERE IdTercero = ?
    `, [id]);

    if (rows[0].total > 0) {
      throw new Error('No se puede eliminar, tiene registros asociados');
    }

    await connection.query(`
      DELETE FROM catalogoterceros
      WHERE IdTercero = ?
    `, [id]);

  } finally {
    connection.release();
  }
};