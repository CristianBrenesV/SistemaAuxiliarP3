import { pool } from '../../../config/db';
import { CreateContactoDTO, UpdateContactoDTO } from '../dtos/createContacto.dto';

// 🔹 LISTAR contactos de un tercero
export const listarContactosPorTercero = async (idTercero: number) => {
  const [rows]: any = await pool.query(`
    SELECT IdContacto, NombreContacto, Cargo, Email, Telefono, TipoContacto, Estado
    FROM tercero_contactos
    WHERE IdTercero = ?
    ORDER BY IdContacto DESC
  `, [idTercero]);

  return rows;
};

// 🔹 CREAR contacto
export const crearContacto = async (idTercero: number, data: CreateContactoDTO) => {
  const [result]: any = await pool.query(`
    INSERT INTO tercero_contactos
    (IdTercero, NombreContacto, Cargo, Email, Telefono, TipoContacto, Estado)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    idTercero, data.nombreContacto, data.cargo || null,
    data.email || null, data.telefono || null, data.tipoContacto, data.estado
  ]);

  return result.insertId;
};

// 🔹 OBTENER contacto por ID
export const obtenerContacto = async (idContacto: number) => {
  const [rows]: any = await pool.query(`
    SELECT * FROM tercero_contactos WHERE IdContacto = ?
  `, [idContacto]);

  return rows[0];
};

// 🔹 ACTUALIZAR contacto
export const actualizarContacto = async (idTercero: number, idContacto: number, data: UpdateContactoDTO) => {
  await pool.query(`
    UPDATE tercero_contactos
    SET NombreContacto = ?, Cargo = ?, Email = ?, Telefono = ?, TipoContacto = ?, Estado = ?
    WHERE IdContacto = ? AND IdTercero = ?
  `, [
    data.nombreContacto, data.cargo || null, data.email || null,
    data.telefono || null, data.tipoContacto, data.estado,
    idContacto, idTercero
  ]);
};

// 🔹 ELIMINAR contacto
export const eliminarContacto = async (idTercero: number, idContacto: number) => {
  await pool.query(`
    DELETE FROM tercero_contactos WHERE IdContacto = ? AND IdTercero = ?
  `, [idContacto, idTercero]);
};