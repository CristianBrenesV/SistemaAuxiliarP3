import { pool } from '../../../config/db';
import { CreateDireccionDTO, UpdateDireccionDTO } from '../dtos/createDireccion.dto';

// 🔹 LISTAR direcciones de un tercero
export const listarDireccionesPorTercero = async (idTercero: number) => {
  const [rows]: any = await pool.query(`
    SELECT IdDireccion, Alias, Provincia, Canton, Distrito, DireccionExacta, EsPrincipal, Estado
    FROM tercero_direcciones
    WHERE IdTercero = ?
    ORDER BY EsPrincipal DESC, IdDireccion DESC
  `, [idTercero]);

  return rows;
};

// 🔹 CREAR dirección
export const crearDireccion = async (idTercero: number, data: CreateDireccionDTO) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (data.esPrincipal) {
      await connection.query(`
        UPDATE tercero_direcciones SET EsPrincipal = 0 WHERE IdTercero = ?
      `, [idTercero]);
    }

    const [result]: any = await connection.query(`
      INSERT INTO tercero_direcciones
      (IdTercero, Alias, Provincia, Canton, Distrito, DireccionExacta, EsPrincipal, Estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      idTercero, data.alias, data.provincia, data.canton,
      data.distrito, data.direccionExacta, data.esPrincipal ? 1 : 0, data.estado
    ]);

    await connection.commit();
    return result.insertId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// 🔹 OBTENER dirección por ID
export const obtenerDireccion = async (idDireccion: number) => {
  const [rows]: any = await pool.query(`
    SELECT * FROM tercero_direcciones WHERE IdDireccion = ?
  `, [idDireccion]);

  return rows[0];
};

// 🔹 ACTUALIZAR dirección
export const actualizarDireccion = async (idTercero: number, idDireccion: number, data: UpdateDireccionDTO) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (data.esPrincipal) {
      await connection.query(`
        UPDATE tercero_direcciones SET EsPrincipal = 0 WHERE IdTercero = ? AND IdDireccion != ?
      `, [idTercero, idDireccion]);
    }

    await connection.query(`
      UPDATE tercero_direcciones
      SET Alias = ?, Provincia = ?, Canton = ?, Distrito = ?, DireccionExacta = ?, EsPrincipal = ?, Estado = ?
      WHERE IdDireccion = ? AND IdTercero = ?
    `, [
      data.alias, data.provincia, data.canton, data.distrito,
      data.direccionExacta, data.esPrincipal ? 1 : 0, data.estado,
      idDireccion, idTercero
    ]);

    await connection.commit();

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// 🔹 ELIMINAR dirección
export const eliminarDireccion = async (idTercero: number, idDireccion: number) => {
  const connection = await pool.getConnection();

  try {
    // Verificar si tiene asignaciones
    const [rows]: any = await connection.query(`
      SELECT COUNT(*) as total FROM asientodetalletercero_direccion WHERE IdDireccion = ?
    `, [idDireccion]);

    if (rows[0].total > 0) {
      throw new Error('No se puede eliminar, tiene registros asociados');
    }

    await connection.query(`
      DELETE FROM tercero_direcciones WHERE IdDireccion = ? AND IdTercero = ?
    `, [idDireccion, idTercero]);

  } finally {
    connection.release();
  }
};