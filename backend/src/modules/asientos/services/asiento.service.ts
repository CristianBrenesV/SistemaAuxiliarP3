import { pool } from '../../../config/db';

export const obtenerDetalles = async (id: number) => {
    const connection = await pool.getConnection();
    try {
        const [result]: any = await connection.query('CALL sp_AsientoDetalleListar(?)', [id]);
        
        return result[0] || []; 

    } catch (error) {
        console.error("Error en service obtenerDetalles:", error);
        throw error;
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
    const connection = await pool.getConnection();
    const offset = (page - 1) * limit;

    try {
        // 1. Obtenemos los datos paginados
        const [rows]: any = await connection.query('CALL sp_asientos_listar_filtro(?, ?, ?, ?)', [
            idPeriodo || null,
            estado || null,
            offset,
            limit
        ]);

        const data = rows[0]; // Las filas del primer procedimiento

        // 2. Obtenemos el conteo total para la paginación
        const [countRows]: any = await connection.query('CALL sp_AsientoEncabezadoConteo(?, ?)', [
            idPeriodo || null,
            estado || null
        ]);
        
        // Accedemos al valor total (ajustado a la estructura común de los SP en MySQL)
        const total = countRows[0][0].total;

        // 3. Retorno consistente para el Frontend
        return {
            data,          // Array de asientos
            page,          // Página actual
            totalPages: Math.ceil(total / limit) // Total de páginas
        };

    } catch (error) {
        console.error("Error en service listarAsientos:", error);
        throw error;
    } finally {
        connection.release();
    }
};