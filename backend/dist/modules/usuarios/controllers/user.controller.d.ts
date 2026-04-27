import { Request, Response } from 'express';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { UpdateUserDTO } from '../dtos/updateUser.dto';
export declare const getUsuarios: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUsuarioById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createUsuario: (req: Request<{}, {}, CreateUserDTO>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUsuario: (req: Request<{
    id: string;
}, {}, UpdateUserDTO>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cambiarEstadoUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const cambiarClaveUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=user.controller.d.ts.map