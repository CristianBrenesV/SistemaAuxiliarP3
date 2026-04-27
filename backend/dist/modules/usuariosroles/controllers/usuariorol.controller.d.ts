import { Request, Response } from 'express';
export declare const getUsuariosRoles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRolesPorUsuario: (req: Request<{
    idUsuario: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRolesActivosPorUsuario: (req: Request<{
    idUsuario: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUsuariosPorRol: (req: Request<{
    idRol: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createUsuarioRol: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteUsuarioRol: (req: Request<{
    idUsuario: string;
    idRol: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=usuariorol.controller.d.ts.map