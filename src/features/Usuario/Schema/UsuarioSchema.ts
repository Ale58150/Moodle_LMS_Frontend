import z from "zod"
import { createPaginatedResponseSchema } from "@/utils/Schema/Response";


export const UsuarioSchema = z.object({
    id_usuario: z.string(),
    nombre: z.string().min(1, "El nombre es obligatorio"),
    apellido_paterno: z.string().min(1, "El apellido paterno es obligatorio"),
    apellido_materno: z.string().nullable(),
    correo: z.string().email("Formato de correo inválido"),
    tipo_documento_identidad: z.string().min(1, "El tipo de documento es obligatorio"),
    numero_documento: z.string().min(1, "El número de documento es obligatorio"),
    telefono: z.string().nullable(),
    ciudad: z.string().nullable(),
    pais: z.string().nullable(),
    ocupacion: z.string().nullable(),
    contacto_emergencia_nombre: z.string().nullable(),
    contacto_emergencia_telefono: z.string().nullable(),
    estado: z.string(),
    rol: z.string(),
    created_at: z.string(),
    updated_at: z.string()
});
export type UsuarioType = z.infer<typeof UsuarioSchema>;
export const UserIndexResponseSchema = createPaginatedResponseSchema(UsuarioSchema);
export type UserIndexResponseType = z.infer<typeof UserIndexResponseSchema>;

export const UserCreateSchema = UsuarioSchema
    .omit({
        id_usuario: true,
        estado: true,
        created_at: true,
        updated_at: true
    })
    .extend({
        rol: z.enum(["administrador", "estudiante", "docente"], {
            message: "Selecciona un rol válido"
        })
    });

export type UserCreateType = z.infer<typeof UserCreateSchema>;


export const UserUpdateSchema = UserCreateSchema.partial();

export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
