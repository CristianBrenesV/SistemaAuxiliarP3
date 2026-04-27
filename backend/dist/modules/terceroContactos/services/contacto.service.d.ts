import { CreateContactoDTO, UpdateContactoDTO } from '../dtos/createContacto.dto';
export declare const listarContactosPorTercero: (idTercero: number) => Promise<any>;
export declare const crearContacto: (idTercero: number, data: CreateContactoDTO) => Promise<any>;
export declare const obtenerContacto: (idContacto: number) => Promise<any>;
export declare const actualizarContacto: (idTercero: number, idContacto: number, data: UpdateContactoDTO) => Promise<void>;
export declare const eliminarContacto: (idTercero: number, idContacto: number) => Promise<void>;
//# sourceMappingURL=contacto.service.d.ts.map