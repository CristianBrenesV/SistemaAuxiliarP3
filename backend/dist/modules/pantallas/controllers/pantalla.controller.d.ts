import { Request, Response } from 'express';
export declare const getPantallas: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPantallaById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createPantalla: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePantalla: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePantalla: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=pantalla.controller.d.ts.map