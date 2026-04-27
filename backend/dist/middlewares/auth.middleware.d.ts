import { Request, Response, NextFunction } from 'express';
interface JwtPayload {
    id: number;
    usuario: string;
    rol: string;
}
export interface AuthRequest extends Request {
    user?: JwtPayload;
}
export declare const verificarToken: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map