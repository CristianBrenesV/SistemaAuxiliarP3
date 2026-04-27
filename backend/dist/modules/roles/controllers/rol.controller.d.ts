import { Request, Response } from 'express';
export declare const getRoles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRolById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createRol: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateRol: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteRol: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=rol.controller.d.ts.map