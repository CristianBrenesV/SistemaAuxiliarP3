export interface CreateContactoDTO {
    nombreContacto: string;
    cargo?: string;
    email?: string;
    telefono?: string;
    tipoContacto: 'Principal' | 'Facturación' | 'Cobros' | 'Soporte' | 'Otro';
    estado: number;
}
export interface UpdateContactoDTO extends Partial<CreateContactoDTO> {
}
//# sourceMappingURL=createContacto.dto.d.ts.map