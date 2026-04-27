import { CreateDireccionDTO, UpdateDireccionDTO } from '../dtos/createDireccion.dto';
export declare const listarDireccionesPorTercero: (idTercero: number) => Promise<any>;
export declare const crearDireccion: (idTercero: number, data: CreateDireccionDTO) => Promise<any>;
export declare const obtenerDireccion: (idDireccion: number) => Promise<any>;
export declare const actualizarDireccion: (idTercero: number, idDireccion: number, data: UpdateDireccionDTO) => Promise<void>;
export declare const eliminarDireccion: (idTercero: number, idDireccion: number) => Promise<void>;
//# sourceMappingURL=direccion.service.d.ts.map