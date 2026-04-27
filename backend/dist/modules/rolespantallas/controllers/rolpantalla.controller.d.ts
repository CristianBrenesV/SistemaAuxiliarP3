import { Request, Response } from 'express';
export declare const getRolesPantallas: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPantallasPorRol: (req: Request<{
    idRol: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPantallasConEstado: (req: Request<{
    idRol: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createRolPantalla: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateRolPantallas: (req: Request<{
    idRol: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteRolPantalla: (req: Request<{
    idRol: string;
    idPantalla: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=rolpantalla.controller.d.ts.map