import { Usuario } from '../interfaces/Usuario';
export declare const listarUsuarios: (limit: number, offset: number) => Promise<Usuario[]>;
export declare const obtenerUsuarioPorId: (id: number) => Promise<Usuario>;
export declare const contarUsuarios: () => Promise<number>;
export declare const insertarUsuario: (data: {
    usuario: string;
    claveCifrada: Buffer;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoElectronico: string;
    tag: Buffer;
    nonce: Buffer;
    estado: string;
}) => Promise<void>;
export declare const actualizarUsuario: (id: number, data: {
    usuario: string;
    nombreUsuario: string;
    apellidoUsuario: string;
    correoElectronico: string;
    estado: string;
}) => Promise<number>;
export declare const eliminarUsuario: (id: number) => Promise<number>;
export declare const cambiarEstado: (id: number, estado: string) => Promise<void>;
export declare const cambiarClave: (id: number, claveCifrada: Buffer, tag: Buffer, nonce: Buffer) => Promise<void>;
//# sourceMappingURL=user.service.d.ts.map