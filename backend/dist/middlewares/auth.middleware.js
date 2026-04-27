"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token requerido' });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensaje: 'Formato de token inválido' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado correctamente' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'losadanp3');
        if (!decoded.id || !decoded.usuario || !decoded.rol) {
            return res.status(401).json({ mensaje: 'Token inválido (payload)' });
        }
        req.user = decoded;
        const nuevoToken = jsonwebtoken_1.default.sign({
            id: decoded.id,
            usuario: decoded.usuario,
            rol: decoded.rol
        }, process.env.JWT_SECRET || 'losadanp3', { expiresIn: '5m' });
        res.setHeader('x-token-renewed', nuevoToken);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(401).json({
                mensaje: 'Token expirado'
            });
        }
        return res.status(401).json({
            mensaje: 'Token inválido'
        });
    }
};
exports.verificarToken = verificarToken;
//# sourceMappingURL=auth.middleware.js.map